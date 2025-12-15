'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Calendar, Package, ArrowRight, Warehouse, Truck, CheckCircle, User } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { cn } from '@/lib/utils';

type ShipmentStatus = 'En magatzem' | 'En trànsit' | 'Lliurat';

interface ShipmentData {
  tracking_code: string;
  Client: string;
  Origen: string;
  Destinacio: string;
  Estat: ShipmentStatus;
  Ubicacio: string;
  Data: string;
}

const statusSteps: { status: ShipmentStatus; label: string; icon: React.ElementType }[] = [
  { status: 'En magatzem', label: 'En Magatzem', icon: Warehouse },
  { status: 'En trànsit', label: 'En Trànsit', icon: Truck },
  { status: 'Lliurat', label: 'Lliurat', icon: CheckCircle },
];

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/bxb74urqmw6ib';

  const handleSearch = async () => {
    if (!trackingCode) {
      setError('Si us plau, introdueix un codi de seguiment.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(`${SHEETDB_API_URL}/search?tracking_code=${trackingCode}`);
      if (!response.ok) {
        throw new Error('No s\'ha pogut connectar amb el servei de seguiment.');
      }
      const data: ShipmentData[] = await response.json();

      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError('Codi no trobat. Si us plau, verifica el codi i torna-ho a provar.');
      }
    } catch (err) {
      setError('Hi ha hagut un problema en fer la cerca. Intenta-ho de nou més tard.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const currentStatusIndex = shipment ? statusSteps.findIndex(step => step.status === shipment.Estat) : -1;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Localitza el teu enviament</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Introdueix el codi de seguiment per veure l'estat actual del teu paquet.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <Input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Ex: TRK-001"
              className="h-12 text-lg flex-grow"
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading} size="lg" className="h-12">
              <Search className="mr-2 h-5 w-5" />
              {isLoading ? 'Cercant...' : 'Cercar'}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {shipment && (
            <Card className="w-full animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Resultat de l'Enviament</span>
                  <span className="text-sm font-mono bg-muted text-muted-foreground px-2 py-1 rounded-md">{shipment.tracking_code}</span>
                </CardTitle>
                 <CardDescription>Informació detallada del teu paquet per a: <span className="font-semibold text-foreground">{shipment.Client}</span></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between text-lg font-medium">
                     <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-muted-foreground" /> {shipment.Origen}</span>
                     <ArrowRight className="h-6 w-6 text-primary" />
                     <span className="flex items-center gap-2">{shipment.Destinacio} <MapPin className="h-5 w-5 text-muted-foreground" /></span>
                  </div>
                  
                  <div>
                    <div className="relative pt-8">
                      {/* Timeline line */}
                      <div className="absolute left-0 top-3.5 w-full h-0.5 bg-border"></div>
                      <div 
                        className="absolute left-0 top-3.5 h-0.5"
                        style={{ 
                          width: `${currentStatusIndex * 50}%`,
                          background: currentStatusIndex === 0 ? 'hsl(var(--tracking-in-warehouse))' : currentStatusIndex === 1 ? 'hsl(var(--tracking-in-transit))' : 'hsl(var(--tracking-delivered))',
                          transition: 'width 0.5s ease-in-out',
                        }}
                      ></div>
                      
                      <div className="relative flex justify-between">
                        {statusSteps.map((step, index) => {
                          const isActive = index <= currentStatusIndex;
                          return (
                            <div key={step.status} className="flex flex-col items-center w-1/3">
                              <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300",
                                isActive ? "border-transparent" : "border-border bg-background",
                                index === 0 && isActive && "bg-tracking-in-warehouse text-white",
                                index === 1 && isActive && "bg-tracking-in-transit text-white",
                                index === 2 && isActive && "bg-tracking-delivered text-white"
                              )}>
                                <step.icon className="h-5 w-5" />
                              </div>
                              <p className={cn("mt-2 text-xs md:text-sm text-center", isActive ? "font-semibold text-foreground" : "text-muted-foreground")}>
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                        <Package className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="text-muted-foreground">Ubicació Actual</p>
                            <p className="font-semibold">{shipment.Ubicacio}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                        <Calendar className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="text-muted-foreground">Data Prevista (ETA)</p>
                            <p className="font-semibold">{shipment.Data}</p>
                        </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
