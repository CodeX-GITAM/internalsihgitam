"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import banner from "../assets/banner.jpg"

export default function Home() {
  const startDate = new Date("2023-09-11T09:58:00"); // Set your desired start date and time
  const targetDate = new Date("2023-09-12T10:58:00"); // Set your desired target date and time

  // Initialize state for the remaining time
  const [remainingTime, setRemainingTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 24, minutes: 59, seconds: 59 });

  // Initialize state for team data
  const [teamData, setTeamData] = useState<any[]>([]);
  const [selectedDesk, setSelectedDesk] = useState(""); // Store the selected desk
  const [selectedTeam, setSelectedTeam] = useState(""); // Store the selected team
  const [query, setQuery] = useState(""); // Store the query
  const [contact, setContact] = useState(""); // Store the contact
  const [category, setCategory] = useState(""); // Store the category

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
      .get(link1[Math.floor(Math.random() * link1.length)])
      .then((res) => {
        const data = res.data;
        setTeamData(data);
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
  const handleDeskSelection = (selectedValue: string) => {
    setSelectedDesk(selectedValue);
    const matchingTeam = teamData.find(
      (element: any) => element.desk === selectedValue
    );

    if (matchingTeam) {
      setTeamLead(matchingTeam.teamlead);
      setSelectedTeam(matchingTeam.team); // Update selected team based on desk
      setContact(matchingTeam.contact);
      setCategory(matchingTeam.category);
    } else {
      setSelectedTeam("");
      setTeamLead("");
      setContact("");
      setCategory("");
    }
  };

  const createQuery: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(link2[Math.floor(Math.random() * link2.length)], {
        team: selectedTeam,
        desk: selectedDesk,
        teamlead: teamLead,
        query: query,
        assignee: "",
        contact: contact,
        category: category,
        status: "open",
      })
      .then((res) => {
        alert("Query submitted successfully!");
        setSelectedTeam("");
        setQuery("");
        setTeamLead("");
        setSelectedDesk("");
        setContact("");
        setCategory("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [teamLead, setTeamLead] = useState("");
  const [venue, setVenue] = useState("");
  const link1 = [
    "https://sheet.best/api/sheets/7bc4be1e-a103-4dc4-a969-6629661ef83f",
    "https://sheet.best/api/sheets/4e5bf062-7e75-4985-8006-d58cc2af292e",
    "https://sheet.best/api/sheets/b5547c0a-5987-4478-a87c-284d33c7e14e",
    "https://sheet.best/api/sheets/41206ee3-f75d-4d3b-a51e-9b5c45429f11",
    "https://sheet.best/api/sheets/1dabd339-a647-494b-8ea3-18c72f77a7ee",
    "https://sheet.best/api/sheets/5778462c-8879-4c81-a937-a039b528cf5b",
    "https://sheet.best/api/sheets/fa2a4a32-cb84-49c8-8291-8eed19966557",
  ];
  const link2 = [
    "https://sheet.best/api/sheets/6678af82-939f-4bae-acb4-8f1584859b38",
    "https://sheet.best/api/sheets/3657565b-9a7d-44cd-9240-598d1e9db443",
    "https://sheet.best/api/sheets/b88990e6-6751-4caa-9108-70b425c82463",
    "https://sheet.best/api/sheets/5e6a99a3-150b-4d7d-8dc3-c2a758237618",
    "https://sheet.best/api/sheets/387009b9-60ab-48d8-b5c8-84d8842e6c58",
    "https://sheet.best/api/sheets/06a083ab-198a-4073-b0c1-4f98c589457a",
    "https://sheet.best/api/sheets/36a240f3-2005-4f27-aa3b-879f4a7b5fb5",
    "https://sheet.best/api/sheets/414df6a9-0a7e-4bc9-a82b-630834bdc083",
  ];

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
      <div className="w-full md:w-[800px] p-7 my-2 md:my-12 mx-auto bg-slate-100 rounded-xl text-center">
        <h1 className="font-bold text-xl">Any Queries?</h1>
        <form className="flex flex-col my-3 gap-3" onSubmit={createQuery}>
          <div className="flex flex-col md:flex-row gap-3">
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleDeskSelection(e.target.value)
              }
              className="p-2 rounded-lg font-semibold bg-slate-50 w-full md:w-[200px]"
              required>
              <option value="" selected={selectedTeam === ""}>
                Team Name
              </option>
              {teamData.map((team) => (
                <option
                  key={team.desk}
                  value={team.desk}
                  selected={selectedTeam === team.desk}>
                  {team.desk}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={teamLead}
              disabled
              placeholder="Team Leader Name"
              className="p-2 rounded-lg w-full md:w-[200px] font-semibold bg-slate-50"
            />
            <input
              type="text"
              disabled
              value={selectedTeam}
              placeholder="Team Name"
              className="p-2 rounded-lg w-full md:w-[200px] font-semibold bg-slate-50"
            />
          </div>
          <textarea
            value={query}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setQuery(e.target.value)
            }
            className="w-full h-[100px] placeholder:text-gray-400 placeholder:font-semibold p-2"
            placeholder="Enter your issue/query clearly!"></textarea>
          <button className="rounded-xl hover:bg-green-500 mx-auto hover:scale-105 bg-green-600 text-white font-bold px-2 py-2 w-full md:w-[200px] ">
            Ask Query!
          </button>
        </form>
      </div>
    </main>
  );
}
