'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/bxb74urqmw6ib';

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SHEETDB_API_URL}/search?Usuari=${user}&Contrasenya=${password}&sheet=usuaris`);
      if (!response.ok) {
        throw new Error('Error en la connexió amb el servidor.');
      }
      const data = await response.json();

      if (data.length > 0) {
        const userData = data[0];
        localStorage.setItem('user', JSON.stringify({ name: userData.Usuari, company: userData.Empresa }));
        router.push('/dashboard');
      } else {
        setError('Dades incorrectes. Si us plau, verifica el teu usuari i contrasenya.');
      }
    } catch (err) {
      setError('Ha ocorregut un error. Intenta-ho de nou més tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 md:py-24">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Accés d'Usuari</CardTitle>
            <CardDescription>Introdueix les teves credencials per accedir.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user">Usuari</Label>
                <Input
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="El teu nom d'usuari"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contrasenya</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="La teva contrasenya"
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
                {isLoading ? 'Verificant...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
