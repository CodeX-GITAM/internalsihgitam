import React from "react";
import Image from "next/image";
import vdc from "../assets/red_vdc.png";
import gitam from "../assets/gitam.jpg";
import eclub from "../assets/transeclublogo.png";
import codex from "../assets/Developed By Codex.png";

const Footer = () => {
  return (
    <div className="pt-4 bg-slate-300 w-screen h-[150px] text-center items-center shadow-lg">
      <h1 className="font-bold">Organizing Partners</h1>
      <div className="flex items-center gap-[75px] justify-center ">
        <Image src={gitam} className="m-2 w-auto h-[45px]" alt="Logo" />
        <Image src={vdc} className="m-2 w-auto h-[45px]" alt="Logo" />
        <Image src={eclub} className="m-2 w-auto h-[45px]" alt="Logo" />
        <Image src={codex} className="m-2 w-auto h-[50px]" alt="Logo" />
      </div>
    </div>
  );
};

export default Footer;
