export function getAppointmentsForDay(state, name) {
 
  const filteredDay = state.days.filter(day => day.name === name);
  let dayAppointment = [];
  for(let day of filteredDay) {
   for( let appointment of Object.values(state.appointments)) {
     if(day.appointments.includes(appointment.id)){
       dayAppointment.push(appointment);
     }
   }
  }
  return dayAppointment;
}

export  function getInterview(state, interview) {
  if (!interview){
    return null;
  }
  let filteredInterview = [];
  for (let interviewer of Object.values(state.interviewers)){
    if(interviewer.id === interview.interviewer){
    filteredInterview = interviewer

    }
  }
  interview.interviewer = filteredInterview;
  console.log('label for interview', interview)
  
  return interview;
}

export function getInterviewersForDay(state, name){
  const filteredDay = state.days.filter(day => day.name === name);
  let dayInterviewer = [];
  for(let day of filteredDay) {
   for( let interviewer of Object.values(state.interviewers)){
     if(day.interviewers.includes(interviewer.id)){
       dayInterviewer.push(interviewer);
     }
   }
  }
  return dayInterviewer;
}