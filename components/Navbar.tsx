"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const hasRefreshed = localStorage.getItem("hasRefreshed");

      if (!hasRefreshed) {
        localStorage.setItem("hasRefreshed", "true");
        window.location.reload();
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("hasRefreshed");
    }
  }, [user]);

  return (
    <nav
      className={`flex flex-between fixed z-50 w-full px-6 py-4 lg:px-10 ${
        isScrolled ? "bg-dark-5" : "bg-transparent sm:bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="flex items-center gap-1 lg:ml-5 lg:mt-2 sm:ml-5 sm:mt-2"
      >
        <div className="hidden lg:block">
          <Image
            src="/icons/logofull.svg"
            alt="logo"
            width={32}
            height={32}
            title="Nexera"
            className="w-32"
          />
        </div>
        <div className="hidden max-lg:block">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
            title="Nexera"
            className="size-10"
          />
        </div>
      </Link>

      <div className="flex-between gap-5">
        {user && (
          <SignedIn>
            <UserButton />
          </SignedIn>
        )}

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
