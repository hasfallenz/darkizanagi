import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://darkizanagi.vercel.app"
  ),
  title: {
    default: "darkizanagi — Personal Engineering Journal & Projects",
    template: "%s | darkizanagi",
  },
  description:
    "Personal engineering journal where I document software projects, AI experiments, system architecture, and technical lessons learned.",
  keywords: [
    "Software Engineering",
    "System Architecture",
    "AI Agent",
    "Next.js",
    "TypeScript",
    "Developer Journal",
    "Havenso Cafe",
    "darkizanagi",
  ],
  authors: [{ name: "darkizanagi" }],
  creator: "darkizanagi",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://darkizanagi.vercel.app",
    title: "darkizanagi — Personal Engineering Journal",
    description:
      "Personal engineering journal where I document software projects, AI experiments, system architecture, and technical lessons learned.",
    siteName: "darkizanagi Engineering Journal",
  },
  twitter: {
    card: "summary_large_image",
    title: "darkizanagi — Personal Engineering Journal",
    creator: "@darkizanagi",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-kiza.png" },
      { url: "/favicon-kiza.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-kiza.png",
    apple: "/favicon-kiza.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#090b10" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fafafa] dark:bg-[#090b10] text-[#111827] dark:text-[#f3f4f6] transition-colors duration-200">
        <Navbar posts={posts} />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
