import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";




export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day });
  const setDays = days => setState({...state, days});
  
  // function bookInterview(id, interview) {
  //   console.log(id, interview);
  // }


useEffect(() => {
  let urls = ["/api/days", "/api/appointments", "/api/interviewers"];

  const fetchUrls = (url) => axios.get(url);
  const promiseArray = urls.map(fetchUrls);

  Promise.all(promiseArray)
    .then((response) => {
     setState(prev => ({
      ...prev, 
      days: response[0].data, 
      appointments: response[1].data, 
      interviewers: response[2].data
    }))
   // console.log(response[2].data[1]); this is not the issue.
    });

}, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  console.log('Checking interviewers:',interviewers);
  
  const schedule = appointments.map((appointment) => { 
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={interviewers}/>
  )}
  )
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
  setDays={setDays}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        
        </section>>
    </main>
    
  );
}