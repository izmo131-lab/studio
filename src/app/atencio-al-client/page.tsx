import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/sections/chatbot';

export default function AtencioAlClientPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}
