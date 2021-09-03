import React from "react";

import DayListItem from "./DayListItem";


export default function DayList(props) {
console.log('props from daylist.js',props)
  const {days, day, setDay} = props;
  const parsedDays = props.days.map((day) => <DayListItem key={day.id} {...day} selected={props.day === day.name} setDay={props.setDay} />);

  return (
  <ul>{parsedDays}</ul>
   
  );
}