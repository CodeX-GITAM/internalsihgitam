import React from "react";
import Image from "next/image";
import vdc from "../assets/red_vdc.png";
import gitam from "../assets/gitam.jpg";
import eclub from "../assets/transeclublogo.png";
import codex from "../assets/Developed By Codex.png";

const Footer = () => {
  return (
    <div className=" aboslute bottom-0 flex flex-col w-screen pt-4 pb-[20px] bg-slate-300 text-center gap-3 shadow-lg">
      <h1 className="font-bold">Organizing Partners</h1>
      <div className=" mx-auto  flex flex-row flex-wrap justify-center items-center gap-8 ">
        <a
          href="https://www.gitam.edu/"
          rel="noreferrer noopener"
          target="_blank">
          <Image src={gitam} className="w-auto h-[45px]" alt="Logo" />
        </a>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://vdc.gitam.edu/">
          <Image src={vdc} className="w-auto h-[45px]" alt="Logo" />
        </a>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://vdc.gitam.edu/eclub/#portfolio">
          <Image src={eclub} className="w-auto h-[45px]" alt="Logo" />
        </a>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://codex-gitam.vercel.app/">
          <Image src={codex} className="w-auto h-[50px]" alt="Logo" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
