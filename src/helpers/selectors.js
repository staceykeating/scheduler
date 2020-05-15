export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => { 
    return singleDay.name === day;
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const appointments= filteredDays[0].appointments.map((app) => {
    return state.appointments[app];
  })

  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
      const newInterview = {
        ...interview,
        interviewer: {...state.interviewers[interview.interviewer]}
      }
      return newInterview;
  } else return null;
  
}