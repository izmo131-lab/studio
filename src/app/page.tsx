import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Products from '@/components/sections/products';
import Consulting from '@/components/sections/consulting';
import AiTool from '@/components/sections/ai-tool';
import Chatbot from '@/components/sections/chatbot';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Products />
        <Consulting />
        <AiTool />
        <Chatbot />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
