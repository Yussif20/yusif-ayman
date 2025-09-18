import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar"], // Updated to en and ar
  defaultLocale: "en", // Keep English as default
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
