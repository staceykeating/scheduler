import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  function save (name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

  function deleted (event) {
    transition(DELETING, true);
    props
    .deleteInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  //const interview = props.interview;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
    />
  )}  
  {mode === CREATE && (
    <Form
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
    /> 
  )}
  {mode === SAVING && (
  <Status
  message="Saving"
  />
)}
  {mode === DELETING && (
    <Status
    message="Deleting"
    />
  )}
  {mode === CONFIRM && (
    <Confirm
    message="Do you want to delete?"
    onCancel={() => back()}
    onConfirm={deleted}
    />
  )}
    {mode === EDIT && (
    <Form
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onSave={save}
    onCancel={() => back()}
    />
    )}
    {mode === ERROR_SAVE && (
      <Error 
      message="Error saving appointment"
      onClose={() => back()}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
      message="Error deleting appointment"
      onClose={() => back()}
      />
    )}
  </article>
  )  
}