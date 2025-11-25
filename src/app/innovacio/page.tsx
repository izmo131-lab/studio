import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Consulting from '@/components/sections/consulting';

export default function InnovacioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Consulting />
      </main>
      <Footer />
    </div>
  );
}
