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
  //console.log(`appointments:`,appointments);
  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
      const newInterview = {
        ...interview,
        interviewer: {...state.interviewers[interview.interviewer]}
      }
     // console.log(`new interview:`,newInterview);
      return newInterview;
      
  } else return null;
  
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => { 
    return singleDay.name === day;
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const interviewers = filteredDays[0].interviewers.map((interview) => {
    return state.interviewers[interview]
  })
  return interviewers;
}