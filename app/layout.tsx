import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { TailwindIndicator } from "@/components/theme/TailwindIndicator";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/post";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Post, PostsByMonth } from "@/types/post";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Viewport } from "next";
import { Handlee, Nunito, Sorts_Mill_Goudy } from "next/font/google";

const sans = Nunito({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-remote-sans",
  weight: ["400", "600", "700"],
});

const serif = Sorts_Mill_Goudy({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-remote-serif",
  weight: ["400"],
});

const handwriting = Handlee({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-remote-handwriting",
  weight: ["400"],
});

export const metadata = {
  ...siteConfig,
  title: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { posts }: { posts: Post[]; postsByMonth: PostsByMonth } =
    await getPosts();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(sans.variable, serif.variable, handwriting.variable)}
    >
      <head />
      <body className="min-h-screen bg-[transparent] antialiased">
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme={siteConfig.defaultNextTheme}
          forcedTheme={siteConfig.defaultNextTheme}
        >
          <Header />
          <main className="flex flex-col items-center py-6 min-h-[80vh]">
            {children}
          </main>
          <Footer />
          <Analytics />
          <TailwindIndicator />
          <div className="fixed h-screen inset-0 bottom-1/4 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:hidden" />
        </ThemeProvider>
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
            <BaiDuAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
