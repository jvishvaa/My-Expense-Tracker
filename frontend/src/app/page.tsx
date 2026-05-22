import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import LandingPage from "@/components/landing/Home";

export default function Home() {
  return (
    <main className="bg-slate-950">
      {/* <Navbar />
      <Hero />
      <Features />
      <About />
      <Contact /> */}
      <LandingPage />
    </main>
  );
}
