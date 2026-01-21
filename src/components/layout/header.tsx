"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Globe, ChevronDown, User, LogOut, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import React from 'react';
import IvoraLogo from './IvoraLogo';
import { useRouter } from 'next/navigation';

const mainLinks = [
  { href: '/serveis', label: 'Serveis' },
  { href: '/productes', label: 'Productes' },
  { href: '/sobre-nosaltres', label: 'Sobre Nosaltres' },
];

const dropdownLinks: { title: string; href: string; description: string }[] = [
    {
        title: 'Seguiment',
        href: '/tracking',
        description: 'Localitza el teu enviament en temps real.',
    },
    {
        title: 'Innovació',
        href: '/innovacio',
        description: 'La nostra aposta per la tecnologia i la sostenibilitat.',
    },
    {
        title: 'Blog',
        href: '/blog',
        description: 'Notícies i anàlisis sobre el sector de la logística.',
    },
    {
        title: 'Contacte',
        href: '/contacte',
        description: 'Parla amb el nostre equip.',
    },
    {
        title: 'Ubicació',
        href: '/ubicacio',
        description: 'On som i com pots contactar amb nosaltres.',
    },
];

interface UserData {
    name: string;
    company: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This code will only run on the client
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Add a check to ensure the user object is valid
        if (parsedUser && parsedUser.name) {
            setUser(parsedUser);
        } else {
            // Invalid data in localStorage
            setUser(null);
            localStorage.removeItem('user');
        }
      } catch (e) {
        // Error parsing, clear invalid data
        setUser(null);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const handleProfileClick = () => {
    if (user) {
        router.push('/dashboard');
    } else {
        router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-accent/95 backdrop-blur supports-[backdrop-filter]:bg-accent/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <IvoraLogo className="text-foreground" />
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
             {mainLinks.map((link) => (
               <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(navigationMenuTriggerStyle(), "gap-1")}>
                  Més <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {dropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Seleccionar idioma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Català
              </DropdownMenuItem>
              <DropdownMenuItem>
                English
              </DropdownMenuItem>
              <DropdownMenuItem>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-5 w-5" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    El meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/documents')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Les meves Factures
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Tancar Sessió
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild>
                <Link href="/login">Login</Link>
             </Button>
          )}

        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Obrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <IvoraLogo className="text-foreground" />
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {[...mainLinks, ...dropdownLinks].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label || link.title}
                    </Link>
                  ))}
                   {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">El meu Perfil</Link>
                      <Link href="/documents" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">Les meves Factures</Link>
                      <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-lg font-medium text-left text-foreground/80 transition-colors hover:text-foreground">Tancar Sessió</button>
                    </>
                   ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">Login</Link>
                   )}
                </nav>
                <div className="mt-auto p-4 border-t">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mb-4">
                        <Globe className="mr-2 h-4 w-4" />
                        Seleccionar idioma
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[250px]">
                      <DropdownMenuItem>
                        Català
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Español
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button asChild className="w-full">
                    <Link href="/contacte" onClick={() => setIsOpen(false)}>Demana un Pressupost</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
