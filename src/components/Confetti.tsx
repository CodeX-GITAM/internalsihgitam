import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Design() {
  const { width, height } = useWindowSize();
  return <Confetti width={1000} height={1000}></Confetti>;
}
