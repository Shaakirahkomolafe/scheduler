import React from 'react';

import 'components/InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
 console.log('why is props undefined',props);
  const parsedInterviewers = props.interviewers.map((interviewer) => <InterviewerListItem
   key={interviewer.id}  
    selected={ interviewer.id === props.interviewer} 
    name={interviewer.name}
    avatar={interviewer.avatar}
    setInterviewer={event => props.setInterviewer(interviewer.id)}
   >{console.log("intervieweeer",interviewer.id, 'prropps', props.interviewer)}
    </InterviewerListItem>);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}