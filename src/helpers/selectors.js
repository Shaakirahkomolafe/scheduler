export function getAppointmentsForDay(state, day) {
  //function to get appointments for each day
  const filteredDay = state.days.find((d) => d.name === day);
  let dayAppointment = [];
 for(let appointment of Object.values(state.appointments)) {
  if (filteredDay.appointments.includes(appointment.id)) {
         dayAppointment.push(appointment);
      }
 }
  return dayAppointment;
}

export function getInterview(state, interview) {
  //function to get interview

  if (!interview) {
    return null;
  }
  let filteredInterview = [];
  for (let interviewer of Object.values(state.interviewers)) {
    if (interviewer.id === interview.interviewer) {
      filteredInterview = interviewer;
    }
  }
  interview.interviewer = filteredInterview;
  return interview;
}

export function getInterviewersForDay(state, day) {
  //function get interviewers for a day
  const filteredDay = state.days.find((d) => d.name === day);
  let dayInterviewer = [];
    for (let interviewer of filteredDay.interviewers ) {
        dayInterviewer.push(state.interviewers[interviewer]); 
    }
  return dayInterviewer;
}
