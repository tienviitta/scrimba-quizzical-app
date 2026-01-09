export default function MultipleChoice({ trivia }) {
  const answerButtons = trivia.shuffledAnswers.map((answer, index) => (
    <button key={index} className="answer-btn">
      {answer}
    </button>
  ));

  return (
    <div className="multiple-choice">
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: trivia.question }}
      />
      <div className="answers">{answerButtons}</div>
    </div>
  );
}
