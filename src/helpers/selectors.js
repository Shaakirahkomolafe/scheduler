export function getAppointmentsForDay(state, day) {

  //function to get appointments for each day
  const found = state.days.find(d => day === d.name);

  if (state.days.length === 0 || found === undefined) return [];

  return found.appointments.map(id => state.appointments[id]);
//   const filteredDay = state.days.find((d) => d.name === day);
//   let dayAppointment = [];
//   if (!filteredDay || filteredDay.appointments.length === 0) {
//     return dayAppointment;
//   }
//  for(let appointment of Object.values(state.appointments)) {
//   if (filteredDay.appointments.includes(appointment.id)) {
//         dayAppointment.push(appointment);
//       }
//  }
//   return dayAppointment;
}

export function getInterview(state, interview) {
  //function to get interview
  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer]
    }
  );

  // if (!interview) {
  //   return null;
  // }
  // let filteredInterview = [];
  // for (let interviewer of Object.values(state.interviewers)) {
  //   if (interviewer.id === interview.interviewer) {
  //     filteredInterview = interviewer;
  //   }
  // }
  // interview.interviewer = filteredInterview;
  // return interview;
}

export function getInterviewersForDay(state, day) {
  //function get interviewers for a day
  const filteredDay = state.days.find((d) => d.name === day);
  let dayInterviewer = [];
  if (!filteredDay || filteredDay.interviewers.length === 0) {
    return dayInterviewer;
  }
    for (let interviewer of filteredDay.interviewers ) {
        dayInterviewer.push(state.interviewers[interviewer]); 
    }
  return dayInterviewer;
}
