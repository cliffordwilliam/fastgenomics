import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Publications", href: "/publications" },
    { name: "Blogs", href: "/blogs" },
    { name: "The Team", href: "/team" },
    { name: "Contact Us", href: "/contact" },
    { name: "ADMIN publication form", href: "/publicationForm" },
    { name: "ADMIN order list", href: "/orderList" },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white">
          <nav className="container mx-auto py-4">
            <ul className="flex space-x-4">
              {links.map((link) => {
                return (
                  <Link
                    className="text-2xl flex-1 hover:text-gray-300 text-center"
                    key={link.name}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}