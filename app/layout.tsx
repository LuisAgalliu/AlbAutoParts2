import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "AlbAutoParts - Pjesë Makinash Cilësore",
  description: "Pjesë makinash cilësore për të gjitha llojet e automjeteve",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AlbAutoParts",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sq">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AlbAutoParts" />
        <meta name="application-name" content="AlbAutoParts" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-4">
              <p className="text-lg font-medium">© AlbAutoParts – Të gjitha të drejtat e rezervuara.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-300">
                <a href="tel:+355686413944" className="hover:text-white transition-colors">
                  📞 068 641 3944
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="tel:+355698917866" className="hover:text-white transition-colors">
                  📞 069 891 7866
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="mailto:info@albautoparts.com" className="hover:text-white transition-colors">
                  ✉️ info@albautoparts.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
