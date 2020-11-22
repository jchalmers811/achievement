import React, { useState } from "react";

const TimeSelector = (props) => {
  const dates = ["0", "1", "2"];
  const times1 = ["1", "2", "3"];
  const times2 = ["2", "3", "4"];
  const times3 = ["3", "4", "5"];
  const allTimes = [times1, times2, times3];

  const [date, setDate] = useState<string>(dates[0]);
  const [time, setTime] = useState<string>(times1[0]);
  const [times, setTimes] = useState<string[]>(allTimes[0]);

  const handleChangeDate = (event) => {
    setDate(event.target.value);
    setTimes(allTimes[event.target.value]);
    if (!times.includes(time)) {
      setTime(times[0]);
    }
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <select value={date} onChange={handleChangeDate}>
        {dates.map((d) => {
          return <option>{d}</option>;
        })}
      </select>
      <select value={time} onChange={handleChangeTime}>
        {times.map((t) => {
          return <option>{t}</option>;
        })}
      </select>
    </div>
  );
};

export default TimeSelector;
