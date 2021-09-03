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