import { GeistSans } from "geist/font/sans"

import { type WithReactChildren } from "@types"

import { TopNav } from "@components"

import "@/styles/globals.css"

export const metadata = {
  title: "Googol",
  description: "A completely manual search engine.",
}

export default function RootLayout({
  children,
}: WithReactChildren) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
