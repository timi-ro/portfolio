import Sidebar from '@/components/Sidebar';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import OffTheClock from '@/components/sections/OffTheClock';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import { CodeRain } from '@/components/CodeRain';
import { CatsOnTheLine } from '@/components/CatsOnTheLine';

export default function Home() {
  return (
    <div className="px-6 md:px-12 lg:px-16 xl:px-20">
      <CodeRain />
      <CatsOnTheLine />
      <div className="lg:flex lg:gap-16 xl:gap-24">
        <Sidebar />
        <main className="pb-16 lg:min-w-0 lg:flex-1 lg:py-24">
          <About />
          <Experience />
          <Skills />
          <OffTheClock />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
