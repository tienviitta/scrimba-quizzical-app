// import { useState } from "react";
import he from "he";

export default function MultipleChoice({
  trivia,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
  answersChecked,
}) {
  function handleAnswerClick(answer) {
    if (!answersChecked) {
      onAnswerSelect(questionIndex, answer);
    }
  }

  function getButtonClass(answer) {
    let className = "answer-btn";

    if (answersChecked) {
      // Show correct answer in green
      if (answer === trivia.correct_answer) {
        className += " correct";
      }
      // Show selected wrong answer in orange
      else if (answer === selectedAnswer) {
        className += " incorrect";
      }
    } else if (answer === selectedAnswer) {
      // Before checking, show selected answer
      className += " selected";
    }

    return className;
  }

  const answerButtons = trivia.shuffledAnswers.map((answer, index) => (
    <button
      key={index}
      className={getButtonClass(answer)}
      onClick={() => handleAnswerClick(answer)}
      disabled={answersChecked}
    >
      {he.decode(answer)}
    </button>
  ));

  return (
    <div className="multiple-choice">
      <div className="question">{he.decode(trivia.question)}</div>
      <div className="answers">{answerButtons}</div>
    </div>
  );
}
