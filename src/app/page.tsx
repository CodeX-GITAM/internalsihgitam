"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import banner from "../assets/banner.jpg";
import Confetti from "@/components/Confetti";
import Design from "@/components/Confetti";
import Aarambh from "@/components/Aarambh";
import Footer from "@/components/Footer";

type TeamData = {
  deskNumber: number;
  teamName: string;
  teamId: string;
  rating: number;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const startDate = new Date("2024-09-14T10:00:00"); // Set your desired start date and time
  const targetDate = new Date("2024 -02-18T10:00:00"); // Set your desired target date and time

  // Initialize state for the remaining time
  const [remainingTime, setRemainingTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 23, minutes: 59, seconds: 59 });
  const [issue, setIssue] = useState(""); // Store the issue

  // Initialize state for team data
  const [teamData, setTeamData] = useState([
    {
      deskNumber: 1,
      teamName: "DUmmy DATA",
      teamId: "1",
      rating: 0,
    },
  ]);
  const [selectedTeam, setSelectedTeam] = useState<TeamData>(); // Store the selected team data

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

  // Fetch team data only once and store it locally
  useEffect(() => {
    axios
      .get("https://aarambh-server.onrender.com/api/public/teams")
      .then((res) => {
        const data = res.data;
        console.log(data.data);
        setTeamData(data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Calculate remaining time
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle desk selection
  const selectionHandler = (e: any) => {
    const deskNumber = Number(e.target.value);
    const selectedTeam = teamData.find(
      (team) => team.deskNumber === deskNumber
    );
    console.log(selectedTeam);
    setSelectedTeam(
      selectedTeam as {
        deskNumber: number;
        teamName: string;
        teamId: string;
        rating: number;
      }
    );
  };
  const postQuery = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try{
 await axios
      .post(
        `https://aarambh-server.onrender.com/api/public/query/${selectedTeam?.deskNumber}`,
        {
          query: issue,
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Query posted successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data.message);
      });} catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="mt-[65px] relative  w-screen h-[400px]">
        <Image
          src={banner}
          alt="banner"
          className=" absolute inset-0 w-screen h-[350px] "
        />
        <div className="absolute inset-0 flex justify-center items-center">
          {remainingTime.hours === 0 &&
          remainingTime.minutes === 0 &&
          remainingTime.seconds === 0 ? (
            <div className="flex flex-col text-center">
              <Design />
              <h1 className="font-bold text-white text- text-8xl font-sans">
                EVENT OVER!!
              </h1>
              <h1 className="font-bold text-white">
                Congratulations on Completion!!!
              </h1>
            </div>
          ) : (
            <div className="flex flex-row gap-3 sp:w-50">
              <Aarambh />
            </div>
          )}
        </div>
      </div>
      {remainingTime.hours === 0 &&
      remainingTime.minutes === 0 &&
      remainingTime.seconds === 0 ? (
        <div className=" flex text-centre w-screen ">
          <h1 className="text-6xl text-[#011A26] text-center">
            SEE YOU ON NEXT EVENTS !
          </h1>
        </div>
      ) : (
        <div className=" w-full md:w-[800px] p-7 my-2 md:my-12 mx-auto bg-slate-100 rounded-xl text-center">
          <h1 className="font-bold text-xl">Any Queries?</h1>
          <form className="flex flex-col my-3 gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <select
                onChange={selectionHandler}
                className="p-2 rounded-lg font-semibold bg-slate-50 w-full md:w-[200px]"
                required>
                <option>Desk Number</option>
                {teamData.map((team) => (
                  <option key={team.deskNumber}>{team.deskNumber}</option>
                ))}
              </select>
              <input
                type="text"
                readOnly
                value={selectedTeam?.teamName}
                placeholder="Team Name"
                className="p-2 rounded-lg w-full md:w-[200px] font-semibold bg-slate-50"
              />
            </div>
            <textarea
              required
              className="w-full h-[100px] placeholder:text-gray-400 placeholder:font-semibold p-2"
              placeholder="Enter your issue shortly!"
              onChange={(e: any) => {
                setIssue(e.target.value);
              }}></textarea>
            <button
              type="submit"
              onClick={postQuery}
              className="rounded-xl hover:bg-green-500 mx-auto hover:scale-105 bg-green-600 text-white font-bold px-2 py-2 w-full md:w-[200px] ">
              Ask Query!
            </button>
          </form>
        </div>
      )}
      <Footer />
    </main>
  );
}
