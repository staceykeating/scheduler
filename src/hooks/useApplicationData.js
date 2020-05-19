import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day });
  //const setDays = days => setState({...state, days});

  
  function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots - 1
        }
      }
          return day;
    });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
      ...appointment
    })
    .then(() => {
    setState({...state, appointments, days})
    .catch(error => console.log(error));
    })
  }


  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots + 1
        }
      }
          return day;
    });

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments, days})
      .catch(error => console.log(error));
    })
  }
  


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
    });

}, [])

return {state, setState, bookInterview, deleteInterview }

}
