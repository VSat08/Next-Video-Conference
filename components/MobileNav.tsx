"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden "
          />
        </SheetTrigger>

        <SheetContent side="left" className="border-none bg-dark-5/95 ">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white ">Nexera</p>
          </Link>

          <div className="flex flex-col   overflow-y-auto  ">
            <SheetClose asChild>
              <section className="flex  flex-col  gap-6 pt-16 text-white ">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-2xl w-full max-w-60",
                          {
                            "text-xl  bg-orange-400/70 ": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className=" font-normal">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>

            <div className=" mt-32 flex flex-col items-center justify-end gap-1">
              <p className="text-xs font-light  text-gray-300">Nexera</p>
              <p className="text-xs font-light  text-gray-500">
                powered by Clerk
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
