import React from 'react';

import 'components/InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

import PropTypes from 'prop-types'; // ES6


function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map((interviewer) => <InterviewerListItem
   key={interviewer.id}  
    selected={ interviewer.id === props.interviewer} 
    name={interviewer.name}
    avatar={interviewer.avatar}
    setInterviewer={event => props.setInterviewer(interviewer.id)}
   >
    </InterviewerListItem>);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
