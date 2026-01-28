'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { LogIn } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../../i18n-config'

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [dictionary, setDictionary] = useState<any>(null);
  const params = useParams();
  const lang = params.lang as Locale;

  useEffect(() => {
    if (!lang) return;
    getDictionary(lang).then(setDictionary);
  }, [lang]);

  const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/bxb74urqmw6ib';

  const handleLogin = async () => {
    if (!dictionary) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SHEETDB_API_URL}/search?usuari=${user}&password=${password}&sheet=usuaris`);
      if (!response.ok) {
        throw new Error(dictionary.login_page.error_server_connection);
      }
      const data = await response.json();

      if (data.length > 0) {
        const userData = data[0];
        localStorage.setItem('user', JSON.stringify({ name: userData.nom, username: userData.usuari, company: userData.empresa }));
        router.push(`/${lang}/dashboard`);
      } else {
        setError(dictionary.login_page.error_incorrect_credentials);
      }
    } catch (err: any) {
      setError(err.message || dictionary.login_page.error_generic);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!dictionary) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow flex items-center justify-center py-16 md:py-24">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">{dictionary.login_page.title}</CardTitle>
            <CardDescription>{dictionary.login_page.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user">{dictionary.login_page.user_label}</Label>
                <Input
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder={dictionary.login_page.user_placeholder}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{dictionary.login_page.password_label}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={dictionary.login_page.password_placeholder}
                  required
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                <LogIn className="mr-2 h-4 w-4" />
                {isLoading ? dictionary.login_page.login_button_loading : dictionary.login_page.login_button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
