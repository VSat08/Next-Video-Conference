"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const router = useRouter();

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [groupSize, setGroupSize] = useState(4);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    const updateGroupSize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setGroupSize(4);
      } else if (width < 960) {
        setGroupSize(6);
      } else {
        setGroupSize(12);
      }
    };

    // Initial group size setup
    updateGroupSize();

    // Update group size on window resize
    window.addEventListener("resize", updateGroupSize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLyout = () => {
    switch (layout) {
      case "grid":
        return (
          <div className="w-full h-full my-auto flex">
            <PaginatedGridLayout
              pageArrowsVisible={true}
              groupSize={groupSize}
            />
          </div>
        );

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full w-full items-center ">
          <div className="w-full h-full my-auto flex ">
            <PaginatedGridLayout
              pageArrowsVisible={true}
              groupSize={groupSize}
            />
          </div>
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2 ", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex flex-wrap-reverse w-full items-center justify-center gap-1 sm:gap-3 md:gap-4 ">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-3 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1/80 backdrop-blur-md text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-2 border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-3 hover:bg-[#4c535b]">
            <Users2 size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
