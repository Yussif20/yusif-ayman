"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSelector() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}`);
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        locale === "ar" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <p className="text-gray-900 dark:text-white">{t("description")}</p>
      <select
        value={locale}
        onChange={handleChange}
        className="p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#b8860b] transition-all"
        aria-label={t("selectLanguage")}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}
