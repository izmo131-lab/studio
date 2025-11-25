"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Package, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: '/#about', label: 'Sobre Nosaltres' },
  { href: '/#services', label: 'Serveis' },
  { href: '/#products', label: 'Productes' },
  { href: '/#consulting', label: 'Innovació' },
  { href: '/#ai-tool', label: 'Optimitzador IA' },
  { href: '/blog', label: 'Blog' },
  { href: '/#testimonials', label: 'Clients' },
  { href: '/#contact', label: 'Contacte' },
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
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/70 transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

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
            <Link href="#contact">Demana un Pressupost</Link>
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
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
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
                    <Link href="#contact" onClick={() => setIsOpen(false)}>Demana un Pressupost</Link>
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
