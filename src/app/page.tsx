"use client";
import Image from "next/image";
import banner from "../assets/banner.jpg"; // Note the path from the public directory
import { useEffect, useState } from "react";

export default function Home() {
  const startDate = new Date("2023-09-11T09:58:00"); // Set your desired start date and time
  const targetDate = new Date("2023-09-12T10:58:00"); // Set your desired target date and time

  // Initialize state for the remaining time
  const [remainingTime, setRemainingTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 24, minutes: 59, seconds: 59 });

  // Function to calculate the remaining time
  function calculateRemainingTime() {
    const currentTime = new Date();
    if (currentTime >= startDate && currentTime < targetDate) {
      const timeDifference = targetDate.getTime() - currentTime.getTime();
      const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
      const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
      const seconds = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds
      return { hours, minutes, seconds };
    } else if (currentTime > startDate && currentTime > targetDate) {
      // Return zeros if current time is not within the countdown period
      return { hours: 0, minutes: 0, seconds: 0 };
    } else {
      return { hours: 23, minutes: 59, seconds: 59 };
    }
  }

  // Update the remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  const getDetail: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setQueryEnabled(true);
  };
  const [team, setTeam] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [venue, setVenue] = useState("");
  const [query, setQuery] = useState("");
  const [queryEnabled, setQueryEnabled] = useState(false);
  return (
    <main className=" ">
      <div className="mt-[65px] relative  w-screen h-[400px]">
        <Image
          src={banner}
          alt="banner"
          className="absolute inset-0 w-screen h-[350px] blur-[2px]"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex flex-row gap-3 sp:w-50">
            <div className="bg-slate-400 w-[100px] h-[150px] bg-opacity-75 flex flex-col justify-center space-y-3 items-center">
              <h1 className="text-4xl font-bold">{remainingTime.hours}</h1>
              <p className="font-semibold">hours</p>
            </div>
            <div className="bg-slate-400 w-[100px] h-[150px] bg-opacity-75 flex flex-col justify-center space-y-3 items-center">
              <h1 className="text-4xl font-bold">{remainingTime.minutes}</h1>
              <p className="font-semibold">minutes</p>
            </div>
            <div className="bg-slate-400 w-[100px] h-[150px] bg-opacity-75 flex flex-col justify-center space-y-3 items-center">
              <h1 className="text-4xl font-bold">{remainingTime.seconds}</h1>
              <p className="font-semibold">Seconds</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[800px] p-7 my-4 md:my-12 mx-auto bg-slate-100 rounded-xl text-center">
        <h1 className="font-bold text-xl">Any Queries?</h1>
        <form className="flex flex-col my-3 gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <select
              className="p-2 rounded-lg font-semibold bg-slate-50 w-full md:w-[200px]"
              required
            >
              <option selected value="">
                Team Name
              </option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
            </select>
            <input
              type="text"
              disabled
              placeholder="Team Leader Name"
              className="p-2 rounded-lg w-full md:w-[200px] font-semibold bg-slate-50"
            />
            <input
              type="text"
              disabled
              placeholder="Venue"
              className="p-2 rounded-lg w-full md:w-[200px] font-semibold bg-slate-50"
            />
            <button
              type="submit"
              className="rounded-xl hover:bg-green-500 hover:scale-105 bg-green-600 text-white font-bold px-2 py-2 w-full"
            >
              Create
            </button>
          </div>
        </form>
        <form className={`${queryEnabled ? "flex flex-col" : "hidden"} gap-4`}>
          <textarea
            className="w-full h-[100px] placeholder:text-gray-400 placeholder:font-semibold p-2"
            placeholder="Enter your issue/query clearly!"
          ></textarea>
          <button className="rounded-xl hover:bg-green-500 mx-auto hover:scale-105 bg-green-600 text-white font-bold px-2 py-2 w-full md:w-[200px] ">
            Ask Query!
          </button>
        </form>
      </div>
    </main>
  );
}

