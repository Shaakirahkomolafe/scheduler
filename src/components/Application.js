import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

import { getInterview } from "helpers/selectors";

import { getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  // function to book interview successfully, it is asynchronus
  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("book interview", id, interview, "appointmeeent", appointment);
//axios api request to insert data in our database 
    let response = await axios
      .put("/api/appointments/" + id, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
        });
        return true;
      });
    if (response) {
      return true;
    }
  }
//function to delete apointments
async function cancelInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  let response = await axios.delete("/api/appointments/" + id, { interview })
  .then((response) => {
    setState({
      ...state,
      appointments,
    });
    return true;
  });
if (response) {
  return true
}
console.log(id, interview);
}


  //setting the state for the data
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

 //helper function imported to get an appointment
  const appointmentList = getAppointmentsForDay(state, state.day);
  //this is to show the array of appointments
  const schedule = appointmentList.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
// react hook to make api calls using axios
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}  cancelInterview={cancelInterview}/>
      </section>
    </main>
  );
}
