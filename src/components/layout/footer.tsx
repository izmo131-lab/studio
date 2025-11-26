"use client"

import Link from 'next/link';
import { Package, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-3 text-xl font-bold text-foreground">
              <Package className="h-7 w-7 text-primary" />
              <span className="font-headline tracking-tight">Ivora Logistics</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">Fundada per Wiam, Álvaro i Izan. La teva operadora de transport i logística de confiança. Ubicats al Polígon Industrial de Constantí.</p>
          </div>
          <div className="flex-1 flex flex-col md:items-end gap-4 text-right">
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Avís Legal</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacitat</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
            </div>
             <p className="text-sm text-muted-foreground mt-4 md:mt-0">&copy; {new Date().getFullYear()} Ivora Logistics SL. Tots els drets reservats.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}