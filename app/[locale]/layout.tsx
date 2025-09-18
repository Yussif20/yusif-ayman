import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

export default async function RootLayout({
  children,
  params, // Don't destructure locale yet
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Type params as a Promise
}) {
  const { locale } = await params; // Await params to get locale
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className="light">
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
