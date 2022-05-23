
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import  QuestionsService  from  '../../routers/QuestionsService';


export const QuestionTab = () => {
  const questionService  =  new QuestionsService();
  console.log(questionService.getQuestions(), 'questions')

  return (
    <div className="m-3" >Question component </div>
  )
};

