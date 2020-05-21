import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    //functon used to simulate loading between add/remove/edit
    if (replace) {
      history.pop();
    }
    history.push(newMode);
    setMode(newMode);
    setHistory(history);
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    } else {
      setMode(mode);
    }
  }
  return { mode, transition, back };
}
