import { useEffect, useState } from "react";
import Header from "./Header";
import triviaData from "./assets/data.js";

function App() {
  // States
  const [trivia, setTrivia] = useState([]);

  // Effects
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Mock API response
        const data = { results: triviaData };
        setTrivia(data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);
  // console.log(trivia);

  const multipleChoiceElements = trivia.map((item, index) => {
    // Combine correct answer with incorrect answs at random position
    const allAnswers = [...item.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
    allAnswers.splice(randomIndex, 0, item.correct_answer);

    return <span key={index}>{item.question}</span>;
  });

  return (
    <div>
      <Header />
      {multipleChoiceElements}
    </div>
  );
}

export default App;
