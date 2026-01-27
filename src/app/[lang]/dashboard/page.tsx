'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../../i18n-config'

interface UserData {
  name: string;
  company: string;
}

// This is a client component, so we can't use async/await for dictionary
// We will have to fetch it or pass it. For now, let's keep it simple.
// The header/footer will be translated from a parent layout if we refactor.
// For now, let's assume this page might not even need a dictionary if it's all dynamic data.
// But header/footer DO. So we must get it.
// The page needs the lang param.
export default function DashboardPage({ params: { lang } }: { params: { lang: Locale } }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [dictionary, setDictionary] = useState<any>(null);


  useEffect(() => {
    getDictionary(lang).then(setDictionary);
    
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user && user.name && user.company) {
          setUserData(user);
        } else {
          localStorage.removeItem('user');
          router.push(`/${lang}/login`);
        }
      } catch (error) {
        localStorage.removeItem('user');
        router.push(`/${lang}/login`);
      }
    } else {
      router.push(`/${lang}/login`);
    }
    setIsLoading(false);
  }, [lang, router]); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    router.push(`/${lang}/login`);
  };

  if (isLoading || !userData || !dictionary) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-grow flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
                    <span className="ml-2 text-muted-foreground">Carregant...</span>
                </div>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
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
                <CardDescription>Aquest és el teu perfil d'usuari a Ivora.</CardDescription>
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
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
