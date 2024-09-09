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
    axios
      .get("https://aarambh-server.onrender.com/api/admin/queries", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setQueries(res.data.data);
        queries.sort((a, b) => {
          if (a.solved && !b.solved) {
            return -1;
          } else if (!a.solved && b.solved) {
            return 1;
          } else {
            return 0;
          }
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          alert("Unauthorized");
          window.location.replace("/login");
        }
      });
  }, []);
  return (
    <div className="w-screen min-h-screen flex-col flex text-center items-center  mt-[100px]">
      {loading && (
        <div className="w-screen h-screen bg-white absolute z-50">
          <Aarambh />
        </div>
      )}
      <a href="/admin/team" className="text-blue-600 underline">
        Team Data
      </a>
      <h1 className="text-2xl font-bold ">Issues</h1>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        {queries.map((query: QueryType, key) => {
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
    </div>
  );
};

export default Page;
