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
  primaryTargetDate: string;
  secondaryTargetDate: string;
  over: boolean;
  setOver: (over: boolean) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  primaryTargetDate,
  secondaryTargetDate,
  over,
  setOver,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [textToShow, setTextToShow] = useState<string>("Welcome!");
  const [isInitialCountdownOver, setIsInitialCountdownOver] =
    useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      const now = new Date();
      const primaryTimeLeft = calculateTimeLeft(primaryTargetDate);
      const secondaryTimeLeft = calculateTimeLeft(secondaryTargetDate);

      if (primaryTimeLeft.total <= 0 && !isInitialCountdownOver) {
        setIsInitialCountdownOver(true);
        setTextToShow("Hackathon has started!");
      }

      if (!isInitialCountdownOver) {
        setTextToShow("Time left for the hackathon to start:");
        setTimeLeft(primaryTimeLeft);
      } else {
        if (secondaryTimeLeft.total <= 0) {
          // Both target dates have passed
          setTextToShow("Hackathon Got Over");
          setOver(true);
          setTimeLeft({
            total: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          clearInterval(timer);
        } else {
          setTextToShow("Hackathon ends in:");
          setTimeLeft(secondaryTimeLeft);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    primaryTargetDate,
    secondaryTargetDate,
    isInitialCountdownOver,
    isMounted,
  ]);

  if (!isMounted || !timeLeft) {
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

export default CountdownTimer;
