import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Product from "@/components/Product";
import ChatDemo from "@/components/ChatDemo";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Solutions />
      <Product />
      <ChatDemo />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}