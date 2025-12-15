'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Calendar, Package, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { cn } from '@/lib/utils';

type ShipmentStatus = 'En magatzem' | 'En trànsit' | 'Lliurat';

interface ShipmentData {
  tracking_code: string;
  origen: string;
  destinacio: string;
  estat: ShipmentStatus;
  ubicacio: string;
  data: string;
}

const getStatusInfo = (status: ShipmentStatus): { progress: number; label: string; colorClass: string } => {
  switch (status) {
    case 'En magatzem':
      return { progress: 10, label: 'En Magatzem', colorClass: 'tracking-in-warehouse' };
    case 'En trànsit':
      return { progress: 50, label: 'En Trànsit', colorClass: 'tracking-in-transit' };
    case 'Lliurat':
      return { progress: 100, label: 'Lliurat', colorClass: 'tracking-delivered' };
    default:
      return { progress: 0, label: 'Desconegut', colorClass: 'tracking-unknown' };
  }
};

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
  
  const statusInfo = shipment ? getStatusInfo(shipment.estat) : null;

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

          {shipment && statusInfo && (
            <Card className="w-full animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Resultat de l'Enviament</span>
                  <span className="text-sm font-mono bg-muted text-muted-foreground px-2 py-1 rounded-md">{shipment.tracking_code}</span>
                </CardTitle>
                 <CardDescription>Informació detallada del teu paquet.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-lg font-medium">
                     <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-muted-foreground" /> {shipment.origen}</span>
                     <ArrowRight className="h-6 w-6 text-primary" />
                     <span className="flex items-center gap-2">{shipment.destinacio} <MapPin className="h-5 w-5 text-muted-foreground" /></span>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Estat de l'enviament</span>
                        <span className="font-semibold text-foreground">{statusInfo.label}</span>
                     </div>
                     <Progress value={statusInfo.progress} className={cn("h-3", statusInfo.colorClass)} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                        <Package className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="text-muted-foreground">Ubicació Actual</p>
                            <p className="font-semibold">{shipment.ubicacio}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                        <Calendar className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="text-muted-foreground">Data Prevista (ETA)</p>
                            <p className="font-semibold">{shipment.data}</p>
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
