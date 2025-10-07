import Hero from "@/sections/Hero";
import Skills from "@/sections/Skills";
import Testimonials from "@/sections/testimonials";
import Experience from "@/sections/experience";
import Education from "@/sections/education";
import Contact from "@/sections/Contact";
import { useLocale } from "next-intl";
import Projects from "@/sections/Projects";

export default function Home() {
  const locale = useLocale();

  return (
    <main id="main-content" className="focus:outline-none" tabIndex={-1}>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Hero locale={locale} />
      <Testimonials />
      <Projects locale={locale} />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
