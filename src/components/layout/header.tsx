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
import { useRouter, usePathname } from 'next/navigation';

interface UserData {
    name: string;
    company: string;
}

export default function Header({ lang, dictionary }: { lang: string, dictionary: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
            setUser(parsedUser);
        } else {
            localStorage.removeItem('user');
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push(`/${lang}/login`);
    window.location.href = `/${lang}/login`;
  };

  const handleProfileClick = () => {
    router.push(`/${lang}/dashboard`);
  };
  
  const mainLinks = [
    { href: `/${lang}/serveis`, label: dictionary?.services },
    { href: `/${lang}/productes`, label: dictionary?.products },
    { href: `/${lang}/sobre-nosaltres`, label: dictionary?.about },
  ];

  const dropdownLinks: { title: string; href: string; description: string }[] = [
      {
          title: dictionary?.tracking,
          href: `/${lang}/tracking`,
          description: 'Localitza el teu enviament en temps real.',
      },
      {
          title: dictionary?.innovation,
          href: `/${lang}/innovacio`,
          description: 'La nostra aposta per la tecnologia i la sostenibilitat.',
      },
      {
          title: dictionary?.blog,
          href: `/${lang}/blog`,
          description: 'Notícies i anàlisis sobre el sector de la logística.',
      },
      {
          title: dictionary?.contact,
          href: `/${lang}/contacte`,
          description: 'Parla amb el nostre equip.',
      },
      {
          title: dictionary?.location,
          href: `/${lang}/ubicacio`,
          description: 'On som i com pots contactar amb nosaltres.',
      },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-accent/95 backdrop-blur supports-[backdrop-filter]:bg-accent/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
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
                  {dictionary?.more} <ChevronDown className="h-4 w-4" />
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
                <span className="sr-only">{dictionary?.select_language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={redirectedPathName('ca')}>{dictionary?.catalan}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={redirectedPathName('en')}>{dictionary?.english}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={redirectedPathName('es')}>{dictionary?.spanish}</Link>
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
                    {dictionary?.my_profile}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${lang}/documents`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    {dictionary?.my_invoices}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {dictionary?.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild>
                <Link href={`/${lang}/login`}>{dictionary?.login}</Link>
             </Button>
          )}

        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{dictionary?.open_menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href={`/${lang}`} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
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
                      <Link href={`/${lang}/dashboard`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">{dictionary?.my_profile}</Link>
                      <Link href={`/${lang}/documents`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">{dictionary?.my_invoices}</Link>
                      <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-lg font-medium text-left text-foreground/80 transition-colors hover:text-foreground">{dictionary?.logout}</button>
                    </>
                   ) : (
                    <Link href={`/${lang}/login`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">{dictionary?.login}</Link>
                   )}
                </nav>
                <div className="mt-auto p-4 border-t">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mb-4">
                        <Globe className="mr-2 h-4 w-4" />
                        {dictionary?.select_language}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[250px]">
                      <DropdownMenuItem asChild>
                        <Link href={redirectedPathName('ca')}>{dictionary?.catalan}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={redirectedPathName('en')}>{dictionary?.english}</Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href={redirectedPathName('es')}>{dictionary?.spanish}</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button asChild className="w-full">
                    <Link href={`/${lang}/contacte`} onClick={() => setIsOpen(false)}>{dictionary?.get_a_quote}</Link>
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
