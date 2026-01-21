'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Printer, ArrowLeft } from 'lucide-react';
import IvoraLogo from '@/components/layout/IvoraLogo';

// Define interfaces for our data structures
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
}

interface ProcessedInvoice {
  id: string;
  date: string;
  paymentMethod: string;
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

export default function DocumentsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<ParsedUser | null>(null);
  const [invoices, setInvoices] = useState<ProcessedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<ProcessedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Authentication check
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
      return;
    }
    const parsedUser: ParsedUser = JSON.parse(userJson);
    setCurrentUser(parsedUser);

    // Data fetching
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [usersRes, docsRes] = await Promise.all([
          fetch(`${SHEETDB_API_URL}?sheet=usuaris`),
          fetch(`${SHEETDB_API_URL}?sheet=documents`),
        ]);

        if (!usersRes.ok || !docsRes.ok) {
          throw new Error('Error en obtenir les dades.');
        }

        const users: User[] = await usersRes.json();
        const documents: DocumentLine[] = await docsRes.json();
        
        const loggedInUser = users.find(u => u.usuari === parsedUser.username);
        if (!loggedInUser) {
          throw new Error("Usuari no trobat a la base de dades.");
        }

        let filteredDocs: DocumentLine[];
        const userIsAdmin = ['admin', 'administrador', 'treballador'].includes(loggedInUser.rol.toLowerCase());

        if (userIsAdmin) {
          filteredDocs = documents;
        } else {
          filteredDocs = documents.filter(doc => doc.usuari === parsedUser.username);
        }

        // Process data
        const groupedByInvoiceNumber = filteredDocs.reduce((acc, doc) => {
          if (doc.num_factura) {
            acc[doc.num_factura] = acc[doc.num_factura] || [];
            acc[doc.num_factura].push(doc);
          }
          return acc;
        }, {} as Record<string, DocumentLine[]>);

        const processedInvoices: ProcessedInvoice[] = Object.entries(groupedByInvoiceNumber).map(([invoiceId, lines]) => {
          const clientData = users.find(u => u.usuari === lines[0].usuari);
          if (!clientData) return null;

          let subtotal = 0;
          const vatMap: Record<string, { base: number; amount: number }> = {};

          const processedLines = lines.map(line => {
            const unitPrice = parseFloat(line.preu_unitari) || 0;
            const units = parseInt(line.unitats, 10) || 0;
            const discount = parseFloat(line.dte) || 0;
            const vatRate = parseInt(line.iva, 10) || 0;

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
            client: clientData,
            lines: processedLines,
            subtotal,
            vatBreakdown,
            total,
          };
        }).filter((invoice): invoice is ProcessedInvoice => invoice !== null);

        setInvoices(processedInvoices);
      } catch (err: any) {
        setError(err.message || 'Ha ocorregut un error inesperat.');
      } finally {
        setIsLoading(false);
      }
    };

    if (parsedUser?.username) {
        fetchData();
    }

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
        <main className="flex-grow flex items-center justify-center">
          <p className="text-destructive">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (selectedInvoice) {
    return (
      <div className="bg-secondary/30 min-h-screen">
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
                        <p className="text-sm text-muted-foreground mt-1">Data: {new Date(selectedInvoice.date).toLocaleDateString('ca-ES')}</p>
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
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedInvoice.lines.map((line, index) => (
                            <TableRow key={index}>
                                <TableCell>{line.concept}</TableCell>
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
                                <span className="text-muted-foreground">IVA ({vat.rate}%)</span>
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

                <footer className="mt-12 pt-6 border-t text-xs text-muted-foreground">
                    <p>Ivora Logistics SL, amb NIF B-12345678, inscrita al Registre Mercantil de Tarragona, Tom 123, Foli 45, Full T-6789. </p>
                    <p className="mt-2">De conformitat amb el que estableix el Reglament (UE) 2016/679 del Parlament Europeu i del Consell de 27 d'abril de 2016 (RGPD), li informem que les seves dades seran incorporades a un tractament sota la nostra responsabilitat, amb la finalitat de gestionar la relació comercial. No se cediran dades a tercers, excepte obligació legal.</p>
                </footer>
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Les Meves Factures</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Aquí pots consultar i descarregar les teves factures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invoices.length > 0 ? (
                invoices.map(invoice => (
                    <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>Factura #{invoice.id}</CardTitle>
                            <CardDescription>Client: {invoice.client.empresa}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-muted-foreground">Data: {new Date(invoice.date).toLocaleDateString('ca-ES')}</span>
                                <span className="font-bold text-lg">{invoice.total.toFixed(2)} €</span>
                            </div>
                            <Button className="w-full" onClick={() => setSelectedInvoice(invoice)}>
                                Veure / Imprimir
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="pt-6">
                        <p>No s'han trobat factures per al teu usuari.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
