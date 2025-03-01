import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { neobrutalism } from "@clerk/themes";
export const metadata: Metadata = {
  title: "Kiki's Todo App",
  description: "Kiki's Todo App",
  icons: [{ rel: "icon", url: "/icon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: neobrutalism,
    }}
    >
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
