import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-6 text-white md:bg-white/5 backdrop-blur-md p-2 md:p-8 rounded-[44px] ">
      <div className="flex items-center gap-6 justify-between">
        <div className="h-[300px] w-full rounded-3xl bg-hero bg-cover">
          <div className="flex h-full flex-col justify-center p-6 gap-16 max-md:px-5 max-md:py-8 lg:p-11">
            <h2 className="glassmorphism max-w-[270px] rounded-xl py-2 text-center text-base  font-normal">
              Upcoming Meeting at 12:30 PM
            </h2>
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-4xl font-extrabold lg:text-6xl xl:text-7xl">
                {time}
              </h1>
              <p className="glassmorphism px-4 p-1.5 rounded-2xl text-lg font-normal text-neutral-50 lg:text-xl">
                {date}
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-cover  bg-scenary h-full hidden md:flex md:flex-col md:justify-center rounded-3xl gap-6 p-2">
          <h1 className="text-5xl font-extrabold">Grab a Meeting Now !</h1>
          <p className="font-bold text-white text-xl">
            Invite folks to your private room
          </p>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
