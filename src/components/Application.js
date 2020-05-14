import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: "Georgey Porgey",
      interviewer: {
        id: 3,
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },  {
    id: 2,
    time: "3pm",
    interview: {
      student: "Larry Lovelace",
      interviewer: {
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];




export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("/api/days").then((response) => {
      console.log(response);
      setDays(response.data);
    });
  }, [])
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
  days={days}
  setDays={setDays}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointments.map((appointment) => { 
          return (
            <Appointment key={appointment.id} {...appointment} />
        )}
        )
        }
      </section>
    </main>
    
  );
}
