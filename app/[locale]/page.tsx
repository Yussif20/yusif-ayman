import Hero from "@/sections/Hero";
import Skills from "@/sections/Skills";
import Testimonials from "@/sections/testimonials";
import Experience from "@/sections/experience";
import Education from "@/sections/education";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return (
    <div className="font-family-base flex flex-col items-center">
      <div className="mx-auto px-4 py-8 sm:py-12 grid gap-8 w-full">
        <Hero locale={locale} />
        <Skills />
        <Testimonials />
        <Experience />
        <Education />
      </div>
    </div>
  );
}
