import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex flex-between fixed z-50 w-full bg-[#1d1d1d]/15 sm:bg-transparent sm:backdrop-blur-0 backdrop-blur-sm  px-6 py-4 lg:px-10">
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
        {/* <p className="text-[26px] font-extrabold text-white max-lg:hidden">
          Nexara
        </p> */}
      </Link>

      <div className="flex-between gap-5">
        {/* Clerk User Management */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
