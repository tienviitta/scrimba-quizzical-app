export default function Header({
  quizStarted,
  onStartQuiz,
  answersChecked,
  score,
  totalQuestions,
}) {
  function getButtonText() {
    if (!quizStarted) return "Start";
    if (!answersChecked) return "Check";
    return "Next";
  }

  return (
    <header className="header">
      <span className="name">Quizzical</span>
      {answersChecked && totalQuestions > 0 && (
        <span className="score-display">
          {score}/{totalQuestions}
        </span>
      )}
      <button className="btn-start" onClick={onStartQuiz}>
        {getButtonText()}
      </button>
    </header>
  );
}
