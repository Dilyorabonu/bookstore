// src/app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo app",
  description: "Vazifalaringizni tartibga soling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
