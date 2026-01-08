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

        // Shuffle answers once when data is loaded
        const triviaWithShuffledAnswers = data.results.map((item) => ({
          ...item,
          shuffledAnswers: [
            ...item.incorrect_answers,
            item.correct_answer,
          ].sort(() => Math.random() - 0.5),
        }));

        setTrivia(triviaWithShuffledAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);
  console.log(trivia);

  // Elements
  const multipleChoiceElements = trivia.map((item, index) => {
    return (
      <div key={index}>
        <span>{item.question}</span>
        <span>{item.shuffledAnswers.join(", ")}</span>
      </div>
    );
  });

  return (
    <div>
      <Header />
      {multipleChoiceElements}
    </div>
  );
}

export default App;
