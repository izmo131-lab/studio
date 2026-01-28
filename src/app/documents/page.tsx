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

// Interfaces for data structures
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

// This is the user object stored in localStorage
interface ParsedUser {
    name: string;
    username: string;
    company: string;
}

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/bxb74urqmw6ib';

// Helper function to parse 'DD/MM/YYYY' dates to avoid browser inconsistencies
const parseCustomDate = (dateStr: string): Date => {
  if (!dateStr || typeof dateStr !== 'string') return new Date(NaN);
  const parts = dateStr.split('/');
  if (parts.length !== 3) return new Date(NaN);
  // new Date(year, monthIndex, day)
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
};

export default function DocumentsPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<ProcessedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<ProcessedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // This effect runs once to authenticate and fetch data
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
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
        router.push('/login');
        return;
    }

    const fetchData = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);
      try {
        const [usersRes, docsRes] = await Promise.all([
          fetch(`${SHEETDB_API_URL}?sheet=usuaris`),
          fetch(`${SHEETDB_API_URL}?sheet=documents`),
        ]);

        if (!usersRes.ok || !docsRes.ok) {
          throw new Error('Error en obtenir les dades de la base de dades.');
        }

        const users: User[] = await usersRes.json();
        const documents: DocumentLine[] = await docsRes.json();
        
        const loggedInUser = users.find(u => u.usuari && u.usuari.toLowerCase() === parsedUser.username.toLowerCase());

        if (!loggedInUser) {
          throw new Error("Usuari no trobat a la base de dades.");
        }

        const userIsAdmin = ['admin', 'administrador', 'treballador'].includes(loggedInUser.rol?.toLowerCase());
        const filteredDocs = userIsAdmin 
            ? documents 
            : documents.filter(doc => doc.usuari && doc.usuari.toLowerCase() === parsedUser.username.toLowerCase());
        
        if (!filteredDocs || filteredDocs.length === 0) {
            if (isMounted) setInvoices([]);
            return;
        }

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

            if (vatRate > 0) {
                if (vatMap[vatRate]) {
                vatMap[vatRate].base += netTotal;
                vatMap[vatRate].amount += vatAmount;
                } else {
                vatMap[vatRate] = { base: netTotal, amount: vatAmount };
                }
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

      } catch (err: any) {
        if (isMounted) setError(err.message || 'Ha ocorregut un error inesperat.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
            <span className="ml-2 text-muted-foreground">Carregant documents...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
            <div>
                <p className="text-destructive font-semibold text-lg mb-4">Ha ocorregut un error</p>
                <p className="text-muted-foreground">{error}</p>
                 <Button onClick={() => window.location.reload()} className="mt-6">Tornar a intentar</Button>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="documents-page flex flex-col min-h-screen bg-background print:block">
        <Header />
        <main className="flex-grow py-16 md:py-24">
            {selectedInvoice ? (
                <div className="container mx-auto p-4 sm:p-8">
                    <div className="flex justify-between items-center mb-8 print:hidden">
                        <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Tornar al llistat
                        </Button>
                        <Button onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir PDF
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
                                <h1 className="text-3xl font-bold font-headline text-foreground">FACTURA</h1>
                                <p className="text-lg mt-2">#{selectedInvoice.id}</p>
                                <p className="text-sm text-muted-foreground mt-1">Data: {parseCustomDate(selectedInvoice.date).toLocaleDateString('ca-ES')}</p>
                                {selectedInvoice.status && (
                                    <Badge className={cn("mt-2 text-destructive-foreground border-transparent", {
                                        'bg-tracking-delivered hover:bg-tracking-delivered/80': selectedInvoice.status.toLowerCase() === 'pagada',
                                        'bg-tracking-in-warehouse hover:bg-tracking-in-warehouse/80': selectedInvoice.status.toLowerCase() === 'pendent',
                                        'bg-tracking-unknown hover:bg-tracking-unknown/80': !['pagada', 'pendent'].includes(selectedInvoice.status.toLowerCase())
                                    })}>
                                        {selectedInvoice.status}
                                    </Badge>
                                )}
                            </div>
                        </header>

                        <section className="mb-8">
                            <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Factura a:</h2>
                            <p className="font-bold text-lg">{selectedInvoice.client.empresa}</p>
                            <p>{selectedInvoice.client.adreca}</p>
                            <p>ID Fiscal: {selectedInvoice.client.fiscalid}</p>
                            <p>Telèfon: {selectedInvoice.client.telefon}</p>
                        </section>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50%]">Concepte</TableHead>
                                    <TableHead className="text-right">Unitats</TableHead>
                                    <TableHead className="text-right">Preu Unit.</TableHead>
                                    <TableHead className="text-right">Total Net</TableHead>
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
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">{selectedInvoice.subtotal.toFixed(2)} €</span>
                                </div>
                                {selectedInvoice.vatBreakdown.map(vat => (
                                    <div key={vat.rate} className="flex justify-between py-2 border-t">
                                        <span className="text-muted-foreground">Base {vat.rate}%: {vat.base.toFixed(2)}€ | Quota</span>
                                        <span className="font-medium">{vat.amount.toFixed(2)} €</span>
                                    </div>
                                ))}
                                <div className="flex justify-between py-3 border-t-2 mt-2">
                                    <span className="text-lg font-bold">TOTAL</span>
                                    <span className="text-lg font-bold">{selectedInvoice.total.toFixed(2)} €</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="font-semibold">Forma de pagament:</h3>
                            <p className="text-muted-foreground">{selectedInvoice.paymentMethod}</p>
                        </div>

                        <footer className="mt-12 pt-6 border-t text-xs text-muted-foreground text-center">
                            <p>Ivora Logistics SL, amb NIF B-12345678, inscrita al Registre Mercantil de Tarragona, Tom 123, Foli 45, Full T-6789. </p>
                            <p className="mt-2">De conformitat amb el que estableix el Reglament (UE) 2016/679 del Parlament Europeu i del Consell de 27 d'abril de 2016 (RGPD), li informem que les seves dades seran incorporades a un tractament sota la nostra responsabilitat, amb la finalitat de gestionar la relació comercial. No se cediran dades a tercers, excepte obligació legal.</p>
                        </footer>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold">Les Meves Factures</h1>
                        <p className="mt-4 text-xl text-muted-foreground">
                            Aquí pots consultar i descarregar les teves factures.
                        </p>
                    </div>
                    
                    {invoices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {invoices.map(invoice => (
                                <Card key={invoice.id} className="hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle>Factura #{invoice.id}</CardTitle>
                                            {invoice.status && (
                                                <Badge className={cn("text-destructive-foreground border-transparent", {
                                                    'bg-tracking-delivered hover:bg-tracking-delivered/80': invoice.status.toLowerCase() === 'pagada',
                                                    'bg-tracking-in-warehouse hover:bg-tracking-in-warehouse/80': invoice.status.toLowerCase() === 'pendent',
                                                    'bg-tracking-unknown hover:bg-tracking-unknown/80': !['pagada', 'pendent'].includes(invoice.status.toLowerCase())
                                                })}>
                                                    {invoice.status}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription>Client: {invoice.client.empresa}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-muted-foreground">Data: {parseCustomDate(invoice.date).toLocaleDateString('ca-ES')}</span>
                                            <span className="font-bold text-lg">{invoice.total.toFixed(2)} €</span>
                                        </div>
                                        <Button className="w-full" onClick={() => setSelectedInvoice(invoice)}>
                                            Veure Detalls
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="pt-6 text-center text-muted-foreground">
                                <p>No s'han trobat factures per al teu usuari.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </main>
        <Footer />
    </div>
  );
}
