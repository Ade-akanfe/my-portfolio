import Navbar from "../components/Navbar";
import HeroClient from "../components/HeroClient";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import BuyMeCoffee from "../components/BuyMeCoffee";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcf8ef] font-sans">
      <Navbar />
      <main className="w-full">
        <HeroClient />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <BuyMeCoffee />
      </main>
      <Footer />
    </div>
  );
}
