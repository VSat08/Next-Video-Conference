import MeetingTypeList from "@/components/MeetingTypeList";
import { ArrowUpRight, MailCheckIcon, TrendingUp } from "lucide-react";
import Link from "next/link";

const Home = () => {
  // const now = new Date();
  // const time = now.toLocaleTimeString("en-IN", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  // const date = new Intl.DateTimeFormat("en-IN", {
  //   dateStyle: "full",
  // }).format(now);

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const time = now.toLocaleTimeString("en-IN", options);

  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
  };
  const date = new Intl.DateTimeFormat("en-IN", dateOptions).format(now);
  return (
    <section className="flex size-full flex-col gap-6 text-white md:bg-white/5 backdrop-blur-md p-2 md:p-8 rounded-[44px] ">
      <div className="flex items-center gap-6 justify-between">
        <div className="h-[300px] w-full rounded-3xl bg-hero bg-cover">
          <div className="flex h-full flex-col justify-center items-start p-6 gap-16 max-md:px-5 max-md:py-8 lg:p-11">
            <h2 className="glassmorphism  rounded-xl p-2 px-3  text-base  font-normal flex items-center gap-2">
              <MailCheckIcon /> Stay connected to your deadlines
            </h2>
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-4xl font-extrabold lg:text-5xl xl:text-7xl">
                {time}
              </h1>
              <p className="glassmorphism px-4 p-1.5 rounded-2xl text-base sm:text-lg font-normal text-neutral-50 lg:text-xl">
                {date}
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-cover  bg-scenary h-full hidden md:flex md:flex-col md:justify-center rounded-3xl gap-6 px-1 py-2">
          <h1 className="text-5xl font-extrabold">
            Grab Meeting Now ! <TrendingUp size={50} className="inline" />
          </h1>
          <Link
            href="/personal-room"
            className="font-bold text-slate-100 text-lg underline underline-offset-4"
          >
            Invite folks to your private room{" "}
            <ArrowUpRight className="inline" size={30} />
          </Link>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
