import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HomeCardProps {
  color: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  color,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-3xl cursor-pointer",
        color
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-xl">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
        <p className="text-lg font-light">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
