import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/blog-posts';
import { Calendar, User } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '../../../../i18n-config'

export default async function BlogPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Ivora Insights</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              La teva font per a les últimes notícies, tendències i anàlisis d'experts en la indústria logística.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link href={`/${lang}/blog/${post.slug}`} className="block">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    width={800}
                    height={400}
                    className="object-cover w-full h-48"
                    data-ai-hint={post.image.hint}
                  />
                </Link>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/${lang}/blog/${post.slug}`} className="text-xl font-bold hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <p className="text-muted-foreground flex-grow">{post.excerpt}</p>
                  <Button asChild className="mt-4 self-start">
                    <Link href={`/${lang}/blog/${post.slug}`}>Llegeix Més</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary.footer} />
    </div>
  );
}
