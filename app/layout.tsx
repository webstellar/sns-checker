import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/Header";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SNS Checker",
  description: "Created by Viet Bui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
