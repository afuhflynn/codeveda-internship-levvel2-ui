import { useEffect, useState } from "react";

const DateComponent = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-us", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);
  setTimeout(() => {
    setDate(
      new Date().toLocaleDateString("en-us", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, 1000);
  return (
    <h1 className="font-bold text-[1.4rem] text-white shadow-sm ml-4 pt-2">
      {date}
    </h1>
  );
};

export default DateComponent;
