import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

import Status from "./Status";

import Confirm from "./Confirm";


export default function Appointment(props) {
  // constants  to help with transition
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  // custom react hook functions to help set mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
//save function created to help save appointments, its asynchronous
  async function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
// this was created to make the code await the function
    let response = await props.bookInterview(props.id, interview);
    if (response) {
      transition(SHOW);
    }
  }
// function to delete appointments
async function deleteAppointment(name, interviewer){
  const interview = {
    student: name,
    interviewer
  };
  console.log('deleting appointment');
  
  await transition(CONFIRM);
  

}
async function onConfirm() {
transition(DELETING);
let response =  await props.cancelInterview(props.id, props.interview)

  if(response){
transition(EMPTY);

 }
}
  return (
    <article className="appointment">
       {/*to show the appointment time*/}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
         student={props.interview.student}
          interviewer={props.interview.interviewer}
          cancelInterview={deleteAppointment}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && <Confirm 
       message='Are you sure you would like to delete?' onConfirm={onConfirm} onCancel={back}/>}
    </article>
  );
}
