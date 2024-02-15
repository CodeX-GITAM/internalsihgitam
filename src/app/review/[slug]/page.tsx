"use client";
import Aarambh from "@/components/Aarambh";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Page = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamdata, setTeamdata] = useState({
    deskNumber: 0,
    teamName: "",
    teamId: "",
    rating: 0,
  });
  const [reviewBy, setReviewBy] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    axios
      .get("https://aarambh-server.onrender.com/api/public/teams")
      .then((res) => {
        const data = res.data?.["data"];
        if (
          data.find(
            (team: { deskNumber: Number }) =>
              team.deskNumber === Number(params.slug)
          ) === undefined
        ) {
          alert("Invalid Team");
          window.location.href = "/review";
        }
        console.log(data);
        const foundData = data.find(
          (team: { deskNumber: Number }) =>
            team.deskNumber === Number(params.slug)
        );
        setTeamdata(foundData);
      });
  }, []);
  const postReview = async () => {
    setIsLoading(true);
    try{
      await axios
      .post(
        `https://aarambh-server.onrender.com/api/public/rating/${params.slug}`,
        {
          ratingBy: reviewBy,
          rating: rating,
          comment: comments,
        }
      )
      .then((res) => {
        alert("Review Posted Successfully");
        window.location.href = "/review";
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data.message);
      });} catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center text-black w-screen h-screen">
      {isLoading && (
        <div className="w-screen h-screen bg-white absolute z-50">
          <Aarambh />
        </div>
      )}
      <div className="bg-slate-100  w-[320px] gap-4 flex flex-col p-5 h-auto text-center">
        <h1>
          <span className="text-xl font-bold">Rating</span>
        </h1>
        <div className="bg-white w-max mx-auto text-gray-500 py-2 px-6 rounded-xl">
          {teamdata.teamName}
        </div>
        <input
          type="text"
          required
          onInput={(e: any) => {
            setReviewBy(e.currentTarget.value);
          }}
          className="w-[200px] mx-auto h-[30px] rounded-lg p-3 placeholder:text-xs"
          placeholder="your name"
        />
        <textarea
          required
          className="w-[200px] mx-auto h-[100px] rounded-lg p-3 placeholder:text-xs"
          placeholder="comments"
          onInput={(e) => {
            setComments(e.currentTarget.value);
          }}></textarea>
        <Rating
          className="z-10"
          SVGclassName={`inline-block`}
          fillColor="#981f2b"
          initialValue={0}
          onClick={(rate) => {
            setRating(rate);
          }}
          allowFraction
        />
        <button
          className="bg-green-600 text-white font-semibold px-3 rounded-lg py-1"
          onClick={postReview}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
