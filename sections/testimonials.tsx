"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = t.raw("reviews");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-14 relative overflow-hidden" id="testimonials">
      <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto px-4 relative z-10">
        <motion.p
          className="text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("title")}
        </motion.p>

        <motion.p
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {t("description")}
        </motion.p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto px-4 relative z-10">
        <div className="relative min-h-[200px] sm:min-h-[250px]">
          {testimonials.map(
            (
              testimonial: {
                opinion: string;
                name: string;
                role: string;
                avatar: string;
              },
              index: number
            ) => (
              <motion.div
                key={index}
                className="absolute w-full"
                initial={{
                  opacity: 0,
                  x: index < currentIndex ? "-100%" : "100%",
                }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x:
                    index === currentIndex
                      ? 0
                      : index < currentIndex
                      ? "-100%"
                      : "100%",
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-4 sm:p-6 max-w-md mx-auto w-full shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-500/10 transition-all duration-300">
                  <blockquote>
                    <p className="text-slate-600 dark:text-slate-300 italic text-sm sm:text-base leading-6">
                      &quot;{testimonial.opinion}&quot;
                    </p>
                  </blockquote>
                  <div className="flex items-center gap-3 mt-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      priority={index === 0}
                    />
                    <div>
                      <span className="text-slate-900 dark:text-white font-medium text-sm sm:text-base">
                        {testimonial.name}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
