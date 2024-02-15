"use client";
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import React, { MouseEvent, use, useState } from "react";
import { useRouter } from "next/navigation";
import { NextRequest as request } from "next/server";
import Cookies from "js-cookie";
import Aarambh from "@/components/Aarambh";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.BASE_URL;
  const router = useRouter();

  const handleLoginClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
    await axios
      .post("https://aarambh-server.onrender.com/api/auth/login", {
        username: username,
        password: password,
      })
      .then((res: AxiosResponse) => {
        // request.cooki setItem("token", res.data?.["data"]);
        Cookies.set("token", res.data?.["data"].accessToken);
        router.push("/admin");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        alert(err.response?.data);
      });} catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {loading && (
        <div className="w-screen h-screen bg-white absolute z-50">
          <Aarambh />
        </div>
      )}
      <form
        className="bg-slate-100 w-[300px] h-[300px] rounded-lg flex flex-col p-5 text-center gap-5"
        onSubmit={handleLoginClick}>
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          type="text"
          required
          name="username"
          placeholder="adminId"
          defaultValue={username}
          className="h-[40px] p-2 rounded-lg"
          autoComplete="new-password"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="password"
          className="h-[40px] p-2 rounded-lg"
          defaultValue={password}
          autoComplete="new-password"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="bg-red-500  hover:bg-red-600 hover:scale-105 text-white p-2 rounded-lg font-bold"
          type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
