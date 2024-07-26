"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-200 lg:text-xl xl:w-32 xl:flex-shrink-0">
        {title}:
      </h1>
      <p className="break-all text-sm font-normal lg:text-base">
        {description}
      </p>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { toast } = useToast();

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex flex-col gap-10 text-white p-4">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 p-4 overflow-hidden">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId || ""} />
        <Table title="Invite link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1 rounded-xl" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3 rounded-xl"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
