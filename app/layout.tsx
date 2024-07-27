import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexera",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/logofull.svg",
            socialButtonsVariant: "iconButton",
            
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#FF7B00",
            colorBackground: "#212121",
            colorInputBackground: "#343434",
            colorInputText: "#fff",
            spacingUnit: "12px",
            
          },
        }}
      >
        <body className={`${inter.className} bg-grad1`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
