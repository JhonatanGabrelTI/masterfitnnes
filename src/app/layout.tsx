import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Master Fitness Ibaiti | Forje a Sua Melhor Versão",
  description: "Treine na academia que está transformando vidas em Ibaiti. Foco, disciplina e equipamentos de última geração.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Master Fitness",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-white">
        {children}
      </body>
    </html>
  );
}

