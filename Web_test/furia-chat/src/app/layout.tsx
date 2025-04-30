import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "FURIA Fan Chat",
  description: "Chat para fãs da FURIA durante os jogos ao vivo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-neutral-900 text-white min-h-screen font-sans">

        {children}
      </body>
    </html>
  );
}
