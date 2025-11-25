"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Package, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import React from 'react';

const mainLinks = [
  { href: '/serveis', label: 'Serveis' },
  { href: '/productes', label: 'Productes' },
  { href: '/sobre-nosaltres', label: 'Sobre Nosaltres' },
  { href: '/contacte', label: 'Contacte' },
];

const dropdownLinks: { title: string; href: string; description: string }[] = [
    {
        title: 'Innovació',
        href: '/innovacio',
        description: 'La nostra aposta per la tecnologia i la sostenibilitat.',
    },
    {
        title: 'Optimitzador IA',
        href: '/optimitzador-ia',
        description: 'Eina d\'IA per optimitzar els teus reptes logístics.',
    },
    {
        title: 'Atenció al Client',
        href: '/atencio-al-client',
        description: 'Resol els teus dubtes amb el nostre xatbot intel·ligent.',
    },
    {
        title: 'Blog',
        href: '/blog',
        description: 'Notícies i anàlisis sobre el sector de la logística.',
    },
    {
        title: 'Ubicació',
        href: '/ubicacio',
        description: 'On som i com pots contactar amb nosaltres.',
    },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Package className="h-6 w-6 text-primary" />
          <span className="font-headline tracking-tight text-xl">Ivora Logistics</span>
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
             {mainLinks.map((link) => (
               <NavigationMenuItem key={link.href}>
                <Link href={link.href} passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Més</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {dropdownLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

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
          <Button asChild>
            <Link href="/contacte">Demana un Pressupost</Link>
          </Button>
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
                   <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setIsOpen(false)}>
                      <Package className="h-6 w-6 text-primary" />
                      <span className="font-headline tracking-tight text-xl">Ivora Logistics</span>
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
