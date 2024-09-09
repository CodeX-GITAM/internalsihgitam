"use client";

import React from "react";
import Image from "next/image";
import codex from "@/assets/Developed By Codex.png";

const ContributorsPage = () => {
  return (
    <div className="flex mt-[50px] flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-10">
      <h1 className="text-5xl text-center font-bold text-indigo-900 mb-10 animate-charcter2">
        <a
          href="https://codex-gitam.vercel.app/"
          rel="noreferrer noopener"
          target="_blank">
          <Image
            src={codex}
            alt="Developed by Codex"
            width={400}
            height={100}
          />
          <p className="text-xs font-bold">#BestStudentLifeClub2023-24</p>
        </a>
      </h1>
      <p className="text-center text-lg text-gray-700 max-w-2xl mb-16">
        Codex Club is a technical club at GITAM, empowering tech enthusiasts to
        build innovative solutions and share knowledge. The following developers
        have contributed their skills and expertise to bring this project to
        life. Join us and become a part of this thriving community!
      </p>

      <table className="min-w-full bg-white shadow-lg rounded-lg mb-12">
        <thead>
          <tr className="bg-indigo-500 text-white text-lg">
            <th className="py-4 px-6 text-left">Developer</th>
            <th className="py-4 px-6 text-left">Contribution</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-6">
              <h2 className="text-xl font-semibold">D Punith</h2>
              <p className="text-sm text-gray-600">Batch: 2021-2025</p>
              <p className="text-sm text-gray-600">CSE AIML</p>
              <p className="text-sm text-gray-600">Roll No: BU21CSEN0300352</p>
              <p className="text-sm text-gray-600">
                Contact:{" "}
                <a
                  href="www.punithdandluri.me"
                  className="text-blue-500 underline">
                  portfolio
                </a>
              </p>
              <p className="text-sm text-gray-600 italic">
                Held responsibilities as Tech Admin of Codex Club
              </p>
            </td>
            <td className="py-4 px-6">
              <span className="text-lg font-bold">Full Stack Development</span>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-6">
              <h2 className="text-xl font-semibold">Sai Santosh</h2>
              <p className="text-sm text-gray-600">Batch: 2021-2025</p>
              <p className="text-sm text-gray-600">CSE</p>
              <p className="text-sm text-gray-600">Roll No: BU21CSEN0100784</p>
              <p className="text-sm text-gray-600 italic">
                Held responsibilities as Non Tech Admin of Codex Club
              </p>
              <p className="text-sm text-gray-600">
                Contact:{" "}
                <a
                  href="mailto:pmarti@gitam.in"
                  className="text-blue-500 underline">
                  pmarti@gitam.in
                </a>
              </p>
            </td>
            <td className="py-4 px-6">
              <span className="text-lg font-bold">Responsive UI Developer</span>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-6">
              <h2 className="text-xl font-semibold">Amit Sabnis</h2>
              <p className="text-sm text-gray-600">Batch: 2023-2027</p>
              <p className="text-sm text-gray-600">CSE</p>
              <p className="text-sm text-gray-600">Roll No: 2023002731</p>
              <p className="text-sm text-gray-600 italic">
                Current Tech Admin of Codex Club
              </p>
              <p className="text-sm text-gray-600">
                Contact:{" "}
                <a
                  href="mailto:asabnis2@gitam.in"
                  className="text-blue-500 underline">
                  asabnis2@gitam.in
                </a>
              </p>
            </td>
            <td className="py-4 px-6">
              <span className="text-lg font-bold">Project Manager</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-center">
        <p className="text-lg text-gray-700 mb-4">
          If you would like to join amazing people like us, click the link
          below:
        </p>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://codex-gitam.vercel.app/"
          className="inline-block px-8 py-3 bg-indigo-500 text-white rounded-lg font-bold text-xl transition duration-300 hover:bg-indigo-700">
          Join Codex Club
        </a>
      </div>
    </div>
  );
};

export default ContributorsPage;
