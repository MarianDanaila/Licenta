import React from "react";
import { formatTime } from "./timeHelper.js";
import "./FormattedDate.css";

export default function FormattedDate({ date }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <div className="FormattedDate">
      Last updated {day}, at {formatTime(hours)}:{formatTime(minutes)}
    </div>
  );
}
