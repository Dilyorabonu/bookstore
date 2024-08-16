// src/app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
// import AuthProvider from "./AuthProvider"; // for authentication
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book store",
  description: "Browse and manage books in our online bookstore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          <main>{children}</main>
          <Toaster position="bottom-center" />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
