"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import banner from "../assets/banner.jpg";
import Confetti from "@/components/Confetti";
import Design from "@/components/Confetti";
import Aarambh from "@/components/Aarambh";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";

type TeamData = {
  deskNumber: number;
  teamName: string;
  teamId: string;
  rating: number;
};

export default function Home() {
  const [hackathonOver, setHackathonOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState("");
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://aarambh-server.onrender.com/api/public/teams"
        );
        if (Array.isArray(response.data?.data)) {
          let unsortedData = response.data?.data;
          unsortedData.sort((a: TeamData, b: TeamData) =>
            a.deskNumber > b.deskNumber ? 1 : -1
          );
          setTeamData(unsortedData);
        } else {
          console.error("Unexpected data format", response.data);
          // Optionally set an empty array or handle the unexpected format
          setTeamData([]);
        }
      } catch (error) {
        console.error(error);
        // Handle error as needed
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetchTeamData();
  }, []);
  const [selectedTeam, setSelectedTeam] = useState<TeamData>(); // Store the selected team data
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
    try {
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
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col w-screen">
      {loading && <Aarambh />}
      <div className="relative flex items-center justify-center mt-[65px] w-screen h-[400px]">
        <Image
          src={banner}
          alt="banner"
          className="absolute inset-0 blur-md w-screen h-[350px] object-cover z-0"
        />
        <div className="relative z-10 ">
          <CountdownTimer
            targetDate="2024-10-01T00:00:00"
            over={hackathonOver}
            setOver={setHackathonOver}
          />
        </div>
      </div>
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
          {selectedTeam && (
            <>
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
                disabled={loading}
                className="rounded-xl hover:bg-green-500 mx-auto hover:scale-105 bg-green-600 text-white font-bold px-2 py-2 w-full md:w-[200px] ">
                Ask Query!
              </button>
            </>
          )}
        </form>
      </div>

      <Footer />
    </main>
  );
}
