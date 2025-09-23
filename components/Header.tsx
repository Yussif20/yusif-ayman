"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("Navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, labelKey: "home" },
    { href: `/${locale}/projects`, labelKey: "projects" },
    { href: `/${locale}/blog`, labelKey: "blog" },
    { href: `/${locale}/services`, labelKey: "services" },
    { href: `/${locale}/contact`, labelKey: "contact" },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-600 bg-ivory-100 dark:bg-charcoal-900">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-2 group">
          <span className="font-serif text-xl font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
            Yusif Ayman
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-gray-900 dark:text-white border-b-2 border-gray-700 dark:border-gray-200"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Desktop Right side - Language Selector and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
            <LanguageSelector />
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t("toggleMenu")}
        >
          <span
            className={`h-0.5 w-5 bg-gray-600 dark:bg-gray-300 rounded transition-all duration-200 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-gray-600 dark:bg-gray-300 rounded transition-all duration-200 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-gray-600 dark:bg-gray-300 rounded transition-all duration-200 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-600 bg-ivory-100 dark:bg-charcoal-900">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-gray-900 dark:text-white border-s-2 border-gray-700 dark:border-gray-200 ps-2"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                <LanguageSelector />
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <ThemeSwitcher />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
