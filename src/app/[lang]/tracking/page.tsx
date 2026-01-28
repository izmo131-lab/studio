'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Calendar, Package, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Progress } from '@/components/ui/progress';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../../i18n-config'

type ShipmentStatus = 'En magatzem' | 'En trànsit' | 'En transit' | 'Lliurat' | 'LLIURAT';

interface ShipmentData {
  tracking_code: string;
  Client: string;
  Origen: string;
  Destinacio: string;
  Estat: ShipmentStatus;
  Ubicacio: string;
  Data: string;
}

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dictionary, setDictionary] = useState<any>(null);
  const params = useParams();
  const lang = params.lang as Locale;

  useEffect(() => {
    if (!lang) return;
    getDictionary(lang).then(setDictionary);
  }, [lang]);

  const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/bxb74urqmw6ib';

  const handleSearch = async () => {
    if (!dictionary) return;
    if (!trackingCode) {
      setError(dictionary.tracking_page.error_enter_code);
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(`${SHEETDB_API_URL}/search?tracking_code=${trackingCode}`);
      if (!response.ok) {
        throw new Error(dictionary.tracking_page.error_connect_service);
      }
      const data: ShipmentData[] = await response.json();

      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError(dictionary.tracking_page.error_code_not_found);
      }
    } catch (err) {
      setError(dictionary.tracking_page.error_generic);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!dictionary) return null;

  const statusConfig: Record<string, { progress: number; colorClass: string; label: string }> = {
    'en magatzem': { progress: 10, colorClass: 'bg-tracking-in-warehouse', label: dictionary.tracking_page.status_in_warehouse },
    'en trànsit': { progress: 50, colorClass: 'bg-tracking-in-transit', label: dictionary.tracking_page.status_in_transit },
    'en transit': { progress: 50, colorClass: 'bg-tracking-in-transit', label: dictionary.tracking_page.status_in_transit },
    'lliurat': { progress: 100, colorClass: 'bg-tracking-delivered', label: dictionary.tracking_page.status_delivered },
  };

  const statusInfo = shipment ? statusConfig[shipment.Estat.toLowerCase()] : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{dictionary.tracking_page.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dictionary.tracking_page.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <Input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder={dictionary.tracking_page.input_placeholder}
              className="h-12 text-lg flex-grow"
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading} size="lg" className="h-12">
              <Search className="mr-2 h-5 w-5" />
              {isLoading ? dictionary.tracking_page.search_button_loading : dictionary.tracking_page.search_button}
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{dictionary.tracking_page.results_title}</CardTitle>
                    <CardDescription>{dictionary.tracking_page.results_description} <span className="font-semibold text-foreground">{shipment.Client}</span></CardDescription>
                  </div>
                  <span className="text-sm font-mono bg-muted text-muted-foreground px-2 py-1 rounded-md">{shipment.tracking_code}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between text-lg font-medium">
                     <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-muted-foreground" /> {shipment.Origen}</span>
                     <ArrowRight className="h-6 w-6 text-primary" />
                     <span className="flex items-center gap-2">{shipment.Destinacio} <MapPin className="h-5 w-5 text-muted-foreground" /></span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground">{dictionary.tracking_page.status}</p>
                        <span className="font-semibold text-foreground">{statusInfo.label}</span>
                     </div>
                     <Progress value={statusInfo.progress} indicatorClassName={statusInfo.colorClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                        <Package className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="text-muted-foreground">{dictionary.tracking_page.current_location}</p>
                            <p className="font-semibold">{shipment.Ubicacio}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                        <Calendar className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="text-muted-foreground">{dictionary.tracking_page.eta}</p>
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
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
