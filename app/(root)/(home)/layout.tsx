import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Nexera",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-4 pb-4 pt-20 max-md:pb-14 sm:px-14">
          <div className="w-full"> {children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
