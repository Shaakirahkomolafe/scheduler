import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //setting the state for the data

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

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

  const updateSpots = function(requestType) {
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    const days = state.days

    if (requestType === 'create') {
      days[dayIndex].spots --
    } else {
      days[dayIndex].spots ++
    }
    return days
  }

  // function to book interview successfully,
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
     interview: { ...interview },
    };
    
   

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // appointments[id] = {...appointment};
    // console.log('+++++ appointments after', appointments)

    //axios api request to insert data in our database
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days: updateSpots('create'),
        });
      });
  }
  //function to delete apointments
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
  
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
        days: updateSpots(),
      });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
