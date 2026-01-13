export default function Header({
  quizStarted,
  onStartQuiz,
  onResetQuiz,
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
      <div className="header-left">
        <i
          className="fa-solid fa-bars home-icon"
          onClick={onResetQuiz}
          title="Return to start and change settings"
        ></i>
        <span className="name">Quizzical</span>
      </div>
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
