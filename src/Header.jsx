export default function Header({ quizStarted, onStartQuiz }) {
  return (
    <header className="header">
      <span className="name">Quizzical</span>
      <button className="btn-start" onClick={onStartQuiz}>
        {quizStarted ? "Check" : "Start"}
      </button>
    </header>
  );
}
