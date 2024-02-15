"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Rating } from "react-simple-star-rating";
import cdxLogo from "../../assets/cdx.png";
import axios from "axios";
import Aarambh from "@/components/Aarambh";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState([
    {
      deskNumber: 1,
      teamName: "DUmmy DATA",
      teamId: "1",
      rating: 0,
    },
  ]);
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("https://aarambh-server.onrender.com/api/public/teams")
        .then((res) => {
          const data = res.data?.["data"];
          setTeamData(data);
          console.log(teamData);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const downloadQR = (deskNumber: number) => {
    const canvas = document.getElementById(
      "react-qrcode-logo"
    ) as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    const name: string = `team-${deskNumber}.png`;
    downloadLink.download = name;
    downloadLink.click();
  };
  return (
    <div className="h-screen text-center mt-[100px] items-center ">
      {loading && (
        <div className="w-screen h-screen bg-white absolute z-50">
          <Aarambh />
        </div>
      )}
      <h1 className="text-3xl font-bold">All Rating Page</h1>
      <div className="grid gap-2 md:grid-cols-3 grid-cols-1">
        {teamData.map((team, index) => {
          return (
            <div
              key={index}
              className="w-[310px] mx-auto p-3 gap-2 flex flex-col justify-center items-center bg-slate-100">
              <h1>Team : {team.deskNumber}</h1>
              <p>Team Name : {team.teamName}</p>
              <QRCode
                value={`https://aarambh-vdc.vercel.app/review/${team.deskNumber}`}
                removeQrCodeBehindLogo={true}
                logoImage="https://media.licdn.com/dms/image/D560BAQHcSdGSRmh9tw/company-logo_100_100/0/1695033094018/codex_gitam_logo?e=1715817600&v=beta&t=5dX02S7TJacZNgINpulNyhO8vCvtKkKl0UVORTM7uiA"
                enableCORS={true}
              />
              <button
                onClick={() => downloadQR(team.deskNumber)}
                className="bg-green-600 text-white font-semibold px-3 rounded-lg py-1">
                Download
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
