import Hero from "@/sections/Hero";
import Education from "@/sections/education";
import Experience from "@/sections/experience";
import Testimonials from "@/sections/testimonials";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return (
    <div className="font-family-base flex flex-col items-center min-h-screen">
      <Hero locale={locale} />
      <div className="container mx-auto px-4 py-8 sm:py-12 grid gap-16">
        <Testimonials />
        <Experience />
        <Education />
      </div>
    </div>
  );
}
