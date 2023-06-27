import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import Search from './Search.jsx';
import AskQuestion from './AskQuestion.jsx';
import Display from './Display.jsx';

const QuesAnswer = ({ product }) => {
  const [questions, setQuestions] = useState([]);
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [isNoMoreQuestions, setIsNoMoreQuestions] = useState(false);
  const [isAskQuestion, setIsAskQuestion] = useState(true);

  const params = {
    product_id: product.id,
    page: 1,
    count: 10,
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  // get data and store questions
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product.id}&page=${1}&count=${100}`, options)
      .then((response) => {
        if (response.data.results.length > 0) {
          setQuestions(response.data.results);
          setDisplayQuestions([response.data.results[0]]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // expand more questions on button click
  const moreQuestionsButtonClickHandler = () => {
    const NUMBER_OF_QUESTIONS_LEFT = 3;
    const NUMBER_OF_QUESTIONS_TO_LOAD = 2;
    if (questions.length - displayQuestions.length < NUMBER_OF_QUESTIONS_LEFT) {
      setDisplayQuestions(questions);
      setIsNoMoreQuestions(true);
    } else {
      setDisplayQuestions(
        questions.slice(0, displayQuestions.length + NUMBER_OF_QUESTIONS_TO_LOAD),
      );
    }
  };

  // make ask a question form appear when ask a question button is clicked
  const addQuestionHandler = () => {
    setIsAskQuestion(false);
  };

  return (
    <section>
      <h2>QUESTIONS & ANSWERS</h2>
      <Search setDisplayQuestions={setDisplayQuestions} />
      <Display questions={displayQuestions} />
      <button type="submit" className="moreQuestionsButton" onClick={moreQuestionsButtonClickHandler} hidden={isNoMoreQuestions}>
        MORE QUESTIONS
        {` (${questions.length - displayQuestions.length})`}
      </button>
      <button
        type="submit"
        className="askQuestionButton"
        onClick={(event) => { addQuestionHandler(event); }}
      >
        ASK A QUESTION
      </button>
      <AskQuestion isAskQuestion={isAskQuestion} product={product} />
    </section>
  );
};

export default QuesAnswer;
