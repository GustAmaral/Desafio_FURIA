import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "FURIA Fan Chat",
  description: "Chat para fãs da FURIA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-neutral-200 text-black min-h-screen font-sans">

        {children}
      </body>
    </html>
  )
}
