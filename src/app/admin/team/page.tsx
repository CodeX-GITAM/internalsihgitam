"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Aarambh from "@/components/Aarambh";

const Page = () => {
  type tokenResDTO = {
    accessToken: string;
    refreshToken: string;
  };
  const [newTeamDeskNumber, setNewTeamDeskNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const router = useRouter();
  const [updatedTeamName, setUpdatedTeamName] = useState("");
  const [teamData, setTeamData] = useState([
    {
      teamId: "",
      deskNumber: 0,
      teamName: "",
      rating: 0,
    },
  ]);
  const [ratingData, setRatingData] = useState([
    {
      ratingId: "",
      rating: 0,
      team: {
        teamId: "",
        deskNumber: 0,
        teamName: "",
        rating: 0,
      },
      ratingBy: "",
      createdOn: "",
    },
  ]);
  const addTeam = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const token = Cookies.get("token");
    try {
      await axios
        .post(
          "https://aarambh-server.onrender.com/api/admin/team",
          {
            deskNumber: newTeamDeskNumber,
            teamName: newTeamName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Team added successfully");
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.message);
          if (err.response.status === 401) {
            Cookies.remove("token");
            router.push("/login");
          }
        });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
    const token = Cookies.get("token");
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-[30px] items-center">
      {loading && (
        <div className="w-screen h-screen bg-white absolute z-50">
          <Aarambh />
        </div>
      )}
      <a
        href="/admin"
        className="text-center text-blue-500 mt-[100px] font-bold">
        Back to Dashboard
      </a>
      <div className="bg-slate-100  w-[300px] p-5 items-center text-center gap-3 flex flex-col">
        <h1 className="font-bold">add new team</h1>
        <form>
          <input
            type="number"
            className="w-[100px]"
            placeholder="Desk No:"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTeamDeskNumber(parseInt(e.target.value));
            }}
            autoComplete="new-password"
            required
          />
          <input
            type="text"
            className="w-[200px]"
            placeholder="Team Name"
            autoComplete="new-password"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTeamName(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            onClick={addTeam}
            className="bg-green-500 text-white font-bold py-1 px-4 rounded-lg">
            Add
          </button>
        </form>
      </div>
      <div className="flex md:flex-row flex-col gap-[50px] items-start">
        <div className="bg-slate-100  mt-[100px]">
          <table className="w-full">
            <thead>
              <tr>
                <th>Desk</th>
                <th>Team</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((team, index) => {
                const updateTeam = async () => {
                  if (updatedTeamName === "")
                    return alert("Team name cannot be empty");
                  const token = Cookies.get("token");
                  setLoading(true);
                  try {
                    await axios
                      .put(
                        `https://aarambh-server.onrender.com/api/admin/team/${team.deskNumber}`,
                        {
                          teamName: updatedTeamName,
                          deskNumber: team.deskNumber,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((res) => {
                        console.log(res);
                        alert("Team updated successfully");
                        window.location.reload();
                      })
                      .catch((err) => {
                        alert(err.response.data.message);
                        if (err.response.status === 401) {
                          Cookies.remove("token");
                          router.push("/login");
                        }
                      });
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setLoading(false);
                  }
                };
                const deleteTeam = async () => {
                  const token = Cookies.get("token");
                  setLoading(true);
                  try {
                    await axios
                      .delete(
                        `https://aarambh-server.onrender.com/api/admin/team/${team.deskNumber}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((res) => {
                        console.log(res);
                        alert("Team deleted successfully");
                        window.location.reload();
                      })
                      .catch((err) => {
                        alert(err.response.data.message);
                        if (err.response.status === 401) {
                          Cookies.remove("token");
                          router.push("/login");
                        }
                      });
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setLoading(false);
                  }
                };
                return (
                  <tr key={index}>
                    <td>{team.deskNumber}</td>
                    <td>
                      <input
                        className="w-[150px]"
                        type="text"
                        defaultValue={team.teamName}
                        onChange={(e: any) => {
                          setUpdatedTeamName(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={updateTeam}
                        className="bg-blue-500 text-white p-1 rounded-md">
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={deleteTeam}
                        className="bg-red-500 text-white p-1 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div className="bg-slate-100 mt-[100px]">
          <div className="bg-slate-100">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Desk</th>
                  <th>Name</th>
                  <th>rating</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {ratingData.map((rating, index) => {
                  const deleteRating = async () => {
                    const token = Cookies.get("token");
                    setLoading(true);
                    try{
                    await axios
                      .delete(
                        `https://aarambh-server.onrender.com/api/admin/rating/${rating.ratingId}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((res) => {
                        console.log(res);
                        alert("Rating deleted successfully");
                        window.location.reload();
                      })
                      .catch((err) => {
                        alert(err.response.data.message);
                        if (err.response.status === 401) {
                          Cookies.remove("token");
                          router.push("/login");
                        }
                      });}
                      catch(err){
                        console.error(err);
                      }
                      finally{
                        setLoading(false);
                      }
                  };
                  return (
                    <tr key={index} className="border-b-2">
                      <td align="center" className="p-2">
                        {rating.createdOn}
                      </td>
                      <td align="center" className="p-2">
                        {rating.team.deskNumber}
                      </td>
                      <td align="center" className="p-2">
                        {rating.ratingBy}
                      </td>
                      <td align="center" className="p-2">
                        {rating.rating}
                      </td>
                      <td align="center" className="p-2">
                        <button
                          onClick={deleteRating}
                          className="bg-red-500 text-white p-1 rounded-md">
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
