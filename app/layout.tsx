import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://demo-portfolio.vercel.app"),
  title: "Demo | Ade-akanfe Ademola — Full-Stack Software Engineer",
  description: "Explore the portfolio of Ade-akanfe Ademola (Demo). A high-performance Software Engineer specializing in building premium, scalable digital experiences with Next.js, TypeScript, and Node.js.",
  keywords: [
    "Ade-akanfe Ademola", 
    "Demo Portfolio", 
    "Full-Stack Engineer", 
    "Software Developer Portfolio", 
    "Next.js Specialist", 
    "TypeScript Developer", 
    "SaaS Builder", 
    "Web Engineering", 
    "Lagos Software Engineer"
  ],
  authors: [{ name: "Ade-akanfe Ademola", url: "https://github.com/Ade-akanfe" }],
  openGraph: {
    title: "Demo | Ade-akanfe Ademola — Full-Stack Software Engineer",
    description: "Crafting premium digital experiences through deep engineering and thoughtful design.",
    url: "https://demo-portfolio.vercel.app", // Placeholder, user will update
    siteName: "Demo Portfolio",
    images: [
      {
        url: "/images/og-image.png", // Recommended size 1200x630
        width: 1200,
        height: 630,
        alt: "Demo Portfolio Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo | Ade-akanfe Ademola",
    description: "Building products that actually matter. Full-Stack Engineer focused on scaling impact.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
