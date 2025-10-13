"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSelector() {
  const t = useTranslations("LanguageSelector");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Remove the current locale from the pathname to get the base path
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Navigate to the same path with the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        locale === "ar" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <select
        value={locale}
        onChange={handleChange}
        className="px-2 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500/50 transition-all duration-300 hover:bg-slate-50/80 dark:hover:bg-slate-700/80 shadow-lg shadow-slate-900/10"
        aria-label={t("selectLanguage")}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}
