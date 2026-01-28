"use client"

import Link from 'next/link';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import IvoraLogo from './IvoraLogo';

export default function Footer({ lang, dictionary }: { lang: string, dictionary: any }) {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex-1">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <IvoraLogo className="text-foreground" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{dictionary?.about}</p>
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
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{dictionary?.legal_notice}</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{dictionary?.privacy}</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{dictionary?.cookies}</Link>
            </div>
             <p className="text-sm text-muted-foreground mt-4 md:mt-0">{dictionary?.copyright?.replace('{year}', new Date().getFullYear().toString())}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
