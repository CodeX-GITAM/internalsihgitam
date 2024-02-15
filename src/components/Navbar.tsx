import vdc from "../assets/red_vdc.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <div
      className={`flex flex-row justify-between top-0 w-screen h-[65px]  fixed z-50 bg-slate-300 shadow-lg `}>
      <div className="items-center">
        <a href="/">
         <Image src={vdc} className="m-2 w-auto h-[45px]" alt="Logo" />
        </a>
      </div>
      <div className="flex flex-row items-center  text-black  font-sans font-bold ">
        <a
          className={` mr-6 hover:text-red-700 ns:text-[14px] ns:w-[100px] p-2 `}
          href="/login">
          Login
        </a>
      </div>
    </div>
  );
}
