import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
export default function Appointment(props) {
  // constants  to help with transition
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR SAVING";
  const ERROR_DELETE ="ERROR DELETING";

  // custom react hook functions to help set mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save function created to help save appointments, its asynchronous
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);
  props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

// function to delete appointments
function destroy() {
  
  transition(DELETING, true);
    props.cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
 }


  return (
    <>
    <article className="appointment">
       {/*to show the appointment time*/}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
         student={props.interview.student}
          interviewer={props.interview.interviewer}
          cancelInterview={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && <Confirm 
       message='Are you sure you would like to delete?' onConfirm={() => destroy()} onCancel={back}/>}
       {mode === EDIT && (
         <Form
        interviewers={props.interviewers}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
       onCancel={back}
        onSave={save}
        />
      
      )}
      {mode === ERROR_SAVE && <Error message='Error while saving' onClose={back}
        />}
      {mode === ERROR_DELETE && <Error message='Error while deleting' onClose={back}
      />}
    </article>
    </>
  );
}
