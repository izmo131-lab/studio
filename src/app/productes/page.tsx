import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Products from '@/components/sections/products';

export default function ProductesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Products />
      </main>
      <Footer />
    </div>
  );
}
