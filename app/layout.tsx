import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import MobileCallBar from "@/components/ui/MobileCallBar";
import Analytics from "@/components/ui/Analytics";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "InternetNearby | Compare Internet Providers & Get Connected", template: "%s | InternetNearby" },
  description: SITE.description,
  applicationName: SITE.name,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "./" },
};
export const viewport: Viewport = { themeColor: "#102A43", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div className="h-20 lg:hidden" aria-hidden />
        <MobileCallBar />
        <Analytics />
      </body>
    </html>
  );
}
