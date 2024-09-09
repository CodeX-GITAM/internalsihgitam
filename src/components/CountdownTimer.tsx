"use client";
import React, { useEffect, useState } from "react";
import Aarambh from "./Aarambh";

interface TimeLeft {
  total: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string; // Expecting a string for the date (ISO format)
  over: boolean;
  setOver: (over: boolean) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  over,
  setOver,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null); // Set initial state to null
  const [textToShow, setTextToShow] = useState<string>("Welcome!");
  const [isInitialCountdownOver, setIsInitialCountdownOver] =
    useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false); // Track component mounting

  useEffect(() => {
    setIsMounted(true); // Component is now mounted
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Do nothing if component is not mounted

    const timer = setInterval(() => {
      const now = new Date();
      const timeLeftToTarget = calculateTimeLeft(targetDate);

      if (timeLeftToTarget.total <= 0 && !isInitialCountdownOver) {
        // Hackathon started
        setIsInitialCountdownOver(true);
        setTextToShow("Hackathon has started!");
      }

      if (!isInitialCountdownOver) {
        setTextToShow("Time left for the hackathon to start:");
        setTimeLeft(timeLeftToTarget);
      } else {
        const timeLeftFor24HourCycle = calculate24HourCountdown(now);

        if (timeLeftFor24HourCycle.total <= 0) {
          // If 24 hours is over, end the hackathon
          setTextToShow("Hackathon Got Over");
          setOver(true);
          clearInterval(timer); // Stop the interval once it's over
        } else {
          setTextToShow("Hackathon ends in:");
          setTimeLeft(timeLeftFor24HourCycle);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isInitialCountdownOver, isMounted]);

  if (!isMounted || !timeLeft) {
    // Prevent server-side rendering and display nothing initially
    return <Aarambh />;
  }

  const formatTime = (time: TimeLeft) => {
    return `${String(time.hours).padStart(2, "0")}:${String(
      time.minutes
    ).padStart(2, "0")}:${String(time.seconds).padStart(2, "0")}`;
  };

  return (
    <div className="text-center font-bold">
      <p className="text-xl p-[20px]">{textToShow}</p>
      {!over && (
        <div className="flex items-center justify-center">
          <div
            id="hours"
            className="flex-col flex bg-slate-300 text-xl p-[20px]">
            {timeLeft.hours}
            <p className="text-xs font-mono">hours</p>
          </div>
          <div id="dito" className=" text-xl p-[20px]">
            :
          </div>
          <div
            id="minutes"
            className="flex-col flex bg-slate-300 text-xl p-[20px]">
            {timeLeft.minutes}
            <p className="text-xs font-mono">mins</p>
          </div>
          <div id="dito" className=" text-xl p-[20px]">
            :
          </div>
          <div
            id="seconds"
            className="flex-col flex bg-slate-300 text-xl p-[20px]">
            {timeLeft.seconds}
            <p className="text-xs font-mono">seconds</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to calculate time left to target date
const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const now = new Date();
  const difference = new Date(targetDate).getTime() - now.getTime();

  let timeLeft: TimeLeft = {
    total: difference,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      total: difference,
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

// Function to calculate 24-hour countdown
const calculate24HourCountdown = (now: Date): TimeLeft => {
  const target24HourEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const difference = target24HourEnd.getTime() - now.getTime();

  return {
    total: difference,
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default CountdownTimer;
