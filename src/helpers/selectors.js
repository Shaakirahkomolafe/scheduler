export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.filter(d => d.name === day);
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
  console.log('interview object', interview);
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

export function getInterviewersForDay(state, day){
  const filteredDay = state.days.filter(d => d.name === day);
  console.log('filtered day for getinterviewers', filteredDay);
  let dayInterviewer = [];
  for(let day of filteredDay) {
   for( let interviewer of Object.values(state.interviewers)){
     if(day.interviewers.includes(interviewer.id)){
       dayInterviewer.push(interviewer);
     }
   }
  }
  console.log('label for day interviewer', dayInterviewer)
  return dayInterviewer;
}