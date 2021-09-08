import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  //setting the state for the data
  const [state, setState] = useState({
   day:  "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = day => {setState({ ...state, day })};

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

  
  // function to book interview successfully, 
   function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //function to update spots
    const updateSpots = function() {
      const findDay = state.days.find(day => day.name === state.day);
      console.log('label for find day', findDay); 
      const emptySpots = findDay.appointments.filter(appointment => appointments[appointment].interview === null).length
      const updateDays=state.days.map(day => {
        if(day.name=== state.day){
          return {...day, spots:emptySpots}
        } else{
          return day
        }
      })
      return updateDays
    }
   
//axios api request to insert data in our database 
  return axios
      .put(`/api/appointments/${id}`, { interview : interview})
      .then((response) => { 
        setState({
          ...state,
          appointments,
        days:updateSpots()
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
   //function to update spots
   const updateSpots = function() {
    const findDay = state.days.find(day => day.name === state.day);
    console.log('label for find day', findDay); 
    const emptySpots = findDay.appointments.filter(appointment => appointments[appointment].interview === null).length

    const updateDays=state.days.map(day => {
      if(day.name=== state.day){
        return {...day, spots:emptySpots}
      } else{
        return day
      }
    })
    console.log('updated day',updateDays);
    return updateDays
  }
 return axios
 .delete(`/api/appointments/${id}`)
  .then((response) => {
    setState({
      ...state,
      appointments,
      days:updateSpots()
     
    });
  
  });

}
return {state, setDay, bookInterview, cancelInterview};
}