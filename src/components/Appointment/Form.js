import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
    setError("");
  }

  function cancel() {
    setError("");
    reset();
    props.onCancel();
  }

  function validate() {
    if (name === "" || interviewer === null) {
      //requires student name and interviewer selection to submit
      setError("Please provide the full details for interview.");
      return;
    }
    setError(""); //removes error message on new submit
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation"> {error} </section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
