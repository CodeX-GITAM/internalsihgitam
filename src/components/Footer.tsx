import React from "react";
import Image from "next/image";
import vdc from "../assets/red_vdc.png";
import gitam from "../assets/gitam.jpg";
import eclub from "../assets/transeclublogo.png";
import codex from "../assets/Developed By Codex.png";

const Footer = () => {
  return (
    <div className="pt-4 bg-slate-300 text-center shadow-lg">
      <h1 className="font-bold">Organizing Partners</h1>
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-8">
        <Image src={gitam} className="w-[100px] sm:w-[120px] h-[45px]" alt="Logo" />
        <Image src={vdc} className="w-[100px] sm:w-[120px] h-[45px]" alt="Logo" />
        <Image src={eclub} className="w-[100px] sm:w-[120px] h-[45px]" alt="Logo" />
        <Image src={codex} className="w-[100px] sm:w-[120px] h-[50px]" alt="Logo" />
      </div>
    </div>
  );
};

export default Footer;
