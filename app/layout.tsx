import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { ThemeSync } from "@/components/ui/theme-sync";
import { getTheme } from "@/lib/actions";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

import { SEO_DETAILS } from "@/lib/constants/seo";

export const metadata: Metadata = {
  metadataBase: SEO_DETAILS.metadataBase,
  title: SEO_DETAILS.title,
  description: SEO_DETAILS.description,
  openGraph: {
    ...SEO_DETAILS.openGraph,
    title: SEO_DETAILS.title,
    description: SEO_DETAILS.description,
  },
  twitter: {
    ...SEO_DETAILS.twitter,
    title: SEO_DETAILS.title,
    description: SEO_DETAILS.description,
  },
  icons: SEO_DETAILS.icons,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased"
        )}
      >
        <Providers>
          {children}
          <ThemeSync preferredTheme={theme} />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
