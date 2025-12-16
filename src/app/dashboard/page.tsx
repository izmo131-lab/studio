'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut } from 'lucide-react';

interface UserData {
  name: string;
  company: string;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This code will only run on the client
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user && user.name && user.company) {
          setUserData(user);
        } else {
          // The stored data is not valid
          localStorage.removeItem('user');
          router.push('/login');
        }
      } catch (error) {
        // Error parsing JSON
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    router.push('/login');
  };

  if (isLoading || !userData) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
                    <span className="ml-2 text-muted-foreground">Carregant...</span>
                </div>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader className="text-center items-center">
                  <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="text-3xl">
                          {userData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                  </Avatar>
                <CardTitle className="text-3xl font-headline">Benvingut, {userData.name}!</CardTitle>
                <CardDescription>Aquest és el teu perfil d'usuari a Ivora Logistics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-md">
                      <User className="h-6 w-6 text-primary" />
                      <div>
                          <p className="text-sm text-muted-foreground">Nom d'Usuari</p>
                          <p className="font-semibold">{userData.name}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-md">
                      <Building className="h-6 w-6 text-primary" />
                      <div>
                          <p className="text-sm text-muted-foreground">Empresa</p>
                          <p className="font-semibold">{userData.company}</p>
                      </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                      <Button variant="outline" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Tancar Sessió
                      </Button>
                  </div>
              </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
