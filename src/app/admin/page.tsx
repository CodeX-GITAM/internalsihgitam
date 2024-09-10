"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Aarambh from "@/components/Aarambh";

type QueryType = {
  assignedTo: null | string;
  query: string;
  queryId: string;
  solved: boolean;
  teamId: {
    deskNumber: number;
    teamName: string;
    teamId: string;
    rating: number;
  };
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [solvedQuery, setSolvedQuery] = useState([]);
  const [unsolvedQuery, setUnsolvedQuery] = useState([]);
  const [solvedBy, setSolvedBy] = useState("");
  const [queries, setQueries] = useState([
    {
      assignedTo: null,
      query: "",
      queryId: "",
      solved: false,
      teamId: {
        deskNumber: 0,
        teamName: "",
        teamId: "",
        rating: 0,
      },
    },
  ] as QueryType[]);
  // Store the queries

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);
      await axios
        .get("https://aarambh-server.onrender.com/api/admin/queries", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setQueries(res.data.data);
          let solved = res.data.data.filter((query: QueryType) => query.solved);
          let unsolved = res.data.data.filter(
            (query: QueryType) => !query.solved
          );
          setSolvedQuery(solved);
          setUnsolvedQuery(unsolved);
        })
        .catch((err) => {
          console.error(err);
          if (err.response?.status === 401) {
            alert("Unauthorized");
            window.location.replace("/login");
          }
        });
    };
    fetchQueries();
    console.log(queries);
    setLoading(false);
  }, []);
  return (
    <div className="w-screen min-h-screen overflow-hidden flex-col flex text-center items-center  mt-[100px]">
      {loading && (
        <div className="w-screen h-screen bg-white absolute z-50">
          <Aarambh />
        </div>
      )}
      <a href="/admin/team" className="text-blue-600 underline">
        Team Data
      </a>
      <h1 className="text-2xl text-center font-bold ">Issues</h1>
      {queries.length >1 ? (
        <>
        <h1 className="text-xl font-bold">Unsolved</h1>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        {unsolvedQuery.map((query: QueryType, key) => {
          const solvedQuery = async () => {
            if (solvedBy === "") {
              alert("Solved by is required!");
              return;
            }
            setLoading(true);
            try {
              await axios
                .put(
                  `https://aarambh-server.onrender.com/api/admin/query/resolve/${query.queryId}`,
                  {
                    closedBy: solvedBy,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  alert("Query solved successfully!");
                  window.location.reload();
                })
                .catch((err) => {
                  console.error(err);
                  alert(err.response?.data.message);
                });
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
          return (
            <div
              key={key}
              className="w-[310px] bg-slate-100 flex gap-2 flex-col p-5">
              <h1>Desk Number</h1>
              <p>{query.teamId.deskNumber}</p>
              <h1>Team Name</h1>
              <p>{query.teamId.teamName}</p>
              <h1>Issue</h1>
              <p>{query.query}</p>
              {!query.solved ? (
                <>
                  <input
                    type="text"
                    placeholder="Solved By"
                    required
                    onChange={(e: any) => {
                      setSolvedBy(e.target.value);
                    }}
                  />
                  <button onClick={solvedQuery} className="bg-green-600">
                    Solve
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Solved By"
                    defaultValue={query.assignedTo?.toString()}
                    readOnly
                  />
                  <button disabled className="bg-green-600">
                    Solved
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-xl font-bold">Solved</h1>
        {/* High UI table for solved queries */}
        <div className="w-full overflow-x-scroll">
          <table className="w-full text-left border-collapse shadow-lg min-w-[600px]">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200">
                  Desk Number
                </th>
                <th className="px-6 py-3 border-b border-gray-200">
                  Team Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200">Issue</th>
                <th className="px-6 py-3 border-b border-gray-200">
                  Solved By
                </th>
              </tr>
            </thead>
            <tbody>
              {solvedQuery.map((query: QueryType, key) => {
                return (
                  <tr
                    key={key}
                    className="odd:bg-white even:bg-gray-100 hover:bg-blue-100 transition-colors duration-300">
                    <td className="px-6 py-4 border-b border-gray-200">
                      {query.teamId.deskNumber}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {query.teamId.teamName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {query.query}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {query.assignedTo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div></>
      ):(
        <Aarambh />
      )}
    </div>
  );
};

export default Page;
