export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => { 
    return singleDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const appointments= filteredDays[0].appointments.map((app) => {
    return state.appointments[app]
  })

  return appointments;
}