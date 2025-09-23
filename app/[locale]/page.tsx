import Hero from "@/sections/Hero";
import Education from "@/sections/education";
import Experience from "@/sections/experience";
import Testimonials from "@/sections/testimonials";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return (
    <div className="font-family-base flex flex-col items-center">
      <div className="mx-auto px-4 py-8 sm:py-12 grid w-full">
        <Hero locale={locale} />
        <Testimonials />
        <Experience />
        <Education />
      </div>
    </div>
  );
}
