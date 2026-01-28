'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Printer, ArrowLeft } from 'lucide-react';
import IvoraLogo from '@/components/layout/IvoraLogo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '../../../../i18n-config';

interface User {
  usuari: string;
  rol: 'admin' | 'administrador' | 'treballador' | 'client';
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
}

interface DocumentLine {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
  estat: string;
}

interface ProcessedInvoice {
  id: string;
  date: string;
  paymentMethod: string;
  status: string;
  client: User;
  lines: {
    concept: string;
    units: number;
    unitPrice: number;
    discount: number;
    vatRate: number;
    netTotal: number;
  }[];
  subtotal: number;
  vatBreakdown: {
    rate: number;
    base: number;
    amount: number;
  }[];
  total: number;
}

interface ParsedUser {
    name: string;
    username: string;
    company: string;
}

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/bxb74urqmw6ib';

const parseCustomDate = (dateStr: string): Date => {
  if (!dateStr || typeof dateStr !== 'string') return new Date(NaN);
  const parts = dateStr.split('/');
  if (parts.length !== 3) return new Date(NaN);
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
};

export default function DocumentsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const router = useRouter();
  const [invoices, setInvoices] = useState<ProcessedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<ProcessedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function initialize() {
        const dict = await getDictionary(lang);
        if (isMounted) {
            setDictionary(dict);
        }

        const userJson = localStorage.getItem('user');
        if (!userJson) {
          router.push(`/${lang}/login`);
          return;
        }

        let parsedUser: ParsedUser;
        try {
            parsedUser = JSON.parse(userJson);
            if(!parsedUser.username) {
                throw new Error("Invalid user data in storage");
            }
        } catch(e) {
            localStorage.removeItem('user');
            router.push(`/${lang}/login`);
            return;
        }

        if (!isMounted) return;
        setIsLoading(true);
        setError(null);
        try {
          const [usersRes, docsRes] = await Promise.all([
            fetch(`${SHEETDB_API_URL}?sheet=usuaris`),
            fetch(`${SHEETDB_API_URL}?sheet=documents`),
          ]);

          if (!usersRes.ok || !docsRes.ok) {
            throw new Error(dict.documents_page.error_db);
          }

          const users: User[] = await usersRes.json();
          const documents: DocumentLine[] = await docsRes.json();
          
          const loggedInUser = users.find(u => u.usuari && u.usuari.toLowerCase() === parsedUser.username.toLowerCase());

          if (!loggedInUser) {
            throw new Error(dict.documents_page.error_user_not_found);
          }

          const userIsAdmin = ['admin', 'administrador', 'treballador'].includes(loggedInUser.rol?.toLowerCase());
          const filteredDocs = userIsAdmin 
              ? documents 
              : documents.filter(doc => doc.usuari && doc.usuari.toLowerCase() === parsedUser.username.toLowerCase());
          
          if (!filteredDocs || filteredDocs.length === 0) {
              if (isMounted) setInvoices([]);
          } else {

            const groupedByInvoiceNumber = filteredDocs.reduce((acc, doc) => {
              if (doc.num_factura) {
                (acc[doc.num_factura] = acc[doc.num_factura] || []).push(doc);
              }
              return acc;
            }, {} as Record<string, DocumentLine[]>);

            const processedInvoices: ProcessedInvoice[] = Object.entries(groupedByInvoiceNumber).map(([invoiceId, lines]) => {
              if (!lines || lines.length === 0 || !lines[0].usuari) return null;
              
              const clientData = users.find(u => u.usuari && u.usuari.toLowerCase() === lines[0].usuari.toLowerCase());
              if (!clientData) return null;

              let subtotal = 0;
              const vatMap: Record<string, { base: number; amount: number }> = {};

              const processedLines = lines.map(line => {
                const unitPrice = parseFloat(String(line.preu_unitari || '0').replace(',','.')) || 0;
                const units = parseInt(String(line.unitats || '0'), 10) || 0;
                const discount = parseFloat(String(line.dte || '0').replace(',','.')) || 0;
                const vatRate = parseInt(String(line.iva || '0'), 10) || 0;

                const grossLineTotal = unitPrice * units;
                const discountAmount = grossLineTotal * (discount / 100);
                const netTotal = grossLineTotal - discountAmount;
                const vatAmount = netTotal * (vatRate / 100);
                
                subtotal += netTotal;

                if (vatMap[vatRate]) {
                  vatMap[vatRate].base += netTotal;
                  vatMap[vatRate].amount += vatAmount;
                } else {
                  vatMap[vatRate] = { base: netTotal, amount: vatAmount };
                }

                return {
                  concept: line.concepte,
                  units,
                  unitPrice,
                  discount,
                  vatRate,
                  netTotal,
                };
              });

              const vatBreakdown = Object.entries(vatMap).map(([rate, values]) => ({
                rate: parseInt(rate, 10),
                base: values.base,
                amount: values.amount,
              }));

              const totalVat = vatBreakdown.reduce((sum, item) => sum + item.amount, 0);
              const total = subtotal + totalVat;
              
              return {
                id: invoiceId,
                date: lines[0].data,
                paymentMethod: lines[0].fpagament,
                status: lines[0].estat,
                client: clientData,
                lines: processedLines,
                subtotal,
                vatBreakdown,
                total,
              };
            }).filter((invoice): invoice is ProcessedInvoice => invoice !== null);
            
            if (isMounted) {
              const sortedInvoices = processedInvoices.sort((a, b) => parseCustomDate(b.date).getTime() - parseCustomDate(a.date).getTime());
              setInvoices(sortedInvoices);
            }
          }

        } catch (err: any) {
          if (isMounted) setError(err.message || dict.documents_page.error_generic);
        } finally {
          if (isMounted) setIsLoading(false);
        }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, [lang, router]);

  const handlePrint = () => {
    window.print();
  };
  
  if (isLoading || !dictionary) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-grow flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
            <span className="ml-2 text-muted-foreground">{dictionary?.documents_page.loading || 'Loading...'}</span>
          </div>
        </main>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header lang={lang} dictionary={dictionary.header} />
        <main className="flex-grow flex items-center justify-center text-center">
            <div>
                <p className="text-destructive font-semibold text-lg mb-4">{dictionary.documents_page.error_title}</p>
                <p className="text-muted-foreground">{error}</p>
                 <Button onClick={() => window.location.reload()} className="mt-6">{dictionary.documents_page.retry_button}</Button>
            </div>
        </main>
        <Footer lang={lang} dictionary={dictionary.footer} />
      </div>
    );
  }

  const getStatus = (status: string) => {
    if (!status) return null;
    const lowerCaseStatus = status.toLowerCase();
    if (lowerCaseStatus === 'pagada') {
      return { label: dictionary.documents_page.status_paid, className: 'bg-tracking-delivered hover:bg-tracking-delivered/80' };
    }
    if (lowerCaseStatus === 'pendent') {
      return { label: dictionary.documents_page.status_pending, className: 'bg-tracking-in-warehouse hover:bg-tracking-in-warehouse/80' };
    }
    return { label: status, className: 'bg-tracking-unknown hover:bg-tracking-unknown/80' };
  };

  if (selectedInvoice) {
    const statusInfo = getStatus(selectedInvoice.status);
    return (
       <div className="bg-secondary/30 min-h-screen">
          <div className="container mx-auto p-4 sm:p-8">
            <div className="flex justify-between items-center mb-8 print:hidden">
                <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {dictionary.documents_page.back_to_list}
                </Button>
                <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    {dictionary.documents_page.print_pdf}
                </Button>
            </div>

            <div id="zona-factura" className="p-8 bg-card border rounded-lg shadow-sm">
                <header className="flex justify-between items-start pb-6 border-b mb-6">
                    <div>
                        <IvoraLogo />
                        <p className="font-semibold mt-4">Ivora Logistics SL</p>
                        <p className="text-sm text-muted-foreground">Carrer de la Logística, 123</p>
                        <p className="text-sm text-muted-foreground">Polígon Industrial de Constantí</p>
                        <p className="text-sm text-muted-foreground">43120 Constantí, Tarragona</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-3xl font-bold font-headline text-foreground">{dictionary.documents_page.invoice_title}</h1>
                        <p className="text-lg mt-2">#{selectedInvoice.id}</p>
                        <p className="text-sm text-muted-foreground mt-1">{dictionary.documents_page.invoice_date} {parseCustomDate(selectedInvoice.date).toLocaleDateString(lang)}</p>
                        {statusInfo && (
                            <Badge className={cn("mt-2 text-destructive-foreground border-transparent", statusInfo.className)}>
                                {statusInfo.label}
                            </Badge>
                        )}
                    </div>
                </header>

                <section className="mb-8">
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">{dictionary.documents_page.invoice_to}</h2>
                    <p className="font-bold text-lg">{selectedInvoice.client.empresa}</p>
                    <p>{selectedInvoice.client.adreca}</p>
                    <p>ID Fiscal: {selectedInvoice.client.fiscalid}</p>
                    <p>Telèfon: {selectedInvoice.client.telefon}</p>
                </section>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50%]">{dictionary.documents_page.invoice_table_concept}</TableHead>
                            <TableHead className="text-right">{dictionary.documents_page.invoice_table_units}</TableHead>
                            <TableHead className="text-right">{dictionary.documents_page.invoice_table_unit_price}</TableHead>
                            <TableHead className="text-right">{dictionary.documents_page.invoice_table_net_total}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedInvoice.lines.map((line, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{line.concept}</TableCell>
                                <TableCell className="text-right">{line.units}</TableCell>
                                <TableCell className="text-right">{line.unitPrice.toFixed(2)} €</TableCell>
                                <TableCell className="text-right font-medium">{line.netTotal.toFixed(2)} €</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-end mt-8">
                    <div className="w-full max-w-sm">
                        <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">{dictionary.documents_page.subtotal}</span>
                            <span className="font-medium">{selectedInvoice.subtotal.toFixed(2)} €</span>
                        </div>
                         {selectedInvoice.vatBreakdown.map(vat => (
                            <div key={vat.rate} className="flex justify-between py-2 border-t">
                                <span className="text-muted-foreground">{dictionary.documents_page.vat_line.replace('{rate}', vat.rate).replace('{base}', vat.base.toFixed(2))}</span>
                                <span className="font-medium">{vat.amount.toFixed(2)} €</span>
                            </div>
                        ))}
                        <div className="flex justify-between py-3 border-t-2 mt-2">
                            <span className="text-lg font-bold">{dictionary.documents_page.total}</span>
                            <span className="text-lg font-bold">{selectedInvoice.total.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
                 <div className="mt-8">
                     <h3 className="font-semibold">{dictionary.documents_page.payment_method}</h3>
                     <p className="text-muted-foreground">{selectedInvoice.paymentMethod}</p>
                 </div>

                <footer className="mt-12 pt-6 border-t text-xs text-muted-foreground text-center">
                    <p>{dictionary.documents_page.legal_footer_1}</p>
                    <p className="mt-2">{dictionary.documents_page.legal_footer_2}</p>
                </footer>
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{dictionary.documents_page.page_title}</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {dictionary.documents_page.page_subtitle}
            </p>
          </div>
          
          {invoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {invoices.map(invoice => {
                    const statusInfo = getStatus(invoice.status);
                    return (
                        <Card key={invoice.id} className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{dictionary.documents_page.invoice_card_title.replace('{id}', invoice.id)}</CardTitle>
                                    {statusInfo && (
                                        <Badge className={cn("text-destructive-foreground border-transparent", statusInfo.className)}>
                                            {statusInfo.label}
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription>{dictionary.documents_page.invoice_card_client} {invoice.client.empresa}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-muted-foreground">{dictionary.documents_page.invoice_card_date} {parseCustomDate(invoice.date).toLocaleDateString(lang)}</span>
                                    <span className="font-bold text-lg">{invoice.total.toFixed(2)} €</span>
                                </div>
                                <Button className="w-full" onClick={() => setSelectedInvoice(invoice)}>
                                    {dictionary.documents_page.view_details_button}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
              </div>
          ) : (
             <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    <p>{dictionary.documents_page.no_invoices_found}</p>
                </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
