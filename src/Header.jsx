export default function Header({ quizStarted, onStartQuiz, answersChecked }) {
  return (
    <header className="header">
      <span className="name">Quizzical</span>
      <button
        className="btn-start"
        onClick={onStartQuiz}
        disabled={answersChecked}
      >
        {quizStarted ? "Check" : "Start"}
      </button>
    </header>
  );
}
