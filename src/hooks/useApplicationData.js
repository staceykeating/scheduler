import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots - 1, //decreases available spots on sidebar when an interview is booked
        };
      }
      return day;
    });
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        ...appointment,
      })
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.spots + 1, //increases available spots when interview is deleted
        };
      }
      return day;
    });

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    let urls = ["/api/days", "/api/appointments", "/api/interviewers"];

    const fetchUrls = (url) => axios.get(url);
    const promiseArray = urls.map(fetchUrls);

    Promise.all(promiseArray).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
