import { GeistSans } from "geist/font/sans"

import { type WithReactChildren } from "@types"

import { Footer, TopNav } from "@components"

import { cn } from "@styles"
import "@/styles/globals.css"

export const metadata = {
  title: "Googol",
  description: "A completely manual search engine.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
}

export default function RootLayout({
  children,
}: WithReactChildren) {
  return (
    <html
      lang="en"
      className={cn(
        "dark font-sans antialiased",
        GeistSans.variable,
      )}
    >
      <body className="min-h-screen">
        <TopNav />
        <main className="flex min-h-screen justify-center p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
