import { useEffect, useState } from "react";
import Header from "./Header";
import MultipleChoice from "./MultipleChoice";
import Loading from "./Loading";
import Error from "./Error";
import Instructions from "./Instructions";

/**
 * Main application component for a trivia quiz app.
 *
 * Manages the trivia quiz session by:
 * - Retrieving and caching a session token from the Open Trivia Database API
 * - Fetching 10 trivia questions using the session token
 * - Shuffling answer options for each question to randomize display order
 * - Handling loading and error states
 *
 * The session token is stored in localStorage and reused if it's less than 6 hours old,
 * otherwise a new token is requested from the API.
 *
 * @component
 * @returns {JSX.Element} The rendered trivia application with header and questions,
 *                        or a loading/error state if applicable
 */
function App() {
  // States
  const [trivia, setTrivia] = useState([]);
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // Handler to start quiz
  function handleStartQuiz() {
    if (!quizStarted) {
      setQuizStarted(true);
      fetchNewQuestions();
    } else if (!answersChecked) {
      // Check answers
      setAnswersChecked(true);
    } else {
      // Load next questions
      fetchNewQuestions();
    }
  }

  // Handler to reset quiz and return to start
  function handleResetQuiz() {
    setQuizStarted(false);
    setAnswersChecked(false);
    setSelectedAnswers({});
    setTrivia([]);
  }

  // Function to fetch new questions
  async function fetchNewQuestions() {
    try {
      setLoading(true);
      setError(null);
      setAnswersChecked(false);
      setSelectedAnswers({});

      // Build API URL with optional category and difficulty
      let apiUrl = `https://opentdb.com/api.php?amount=10&token=${sessionToken}`;
      if (selectedCategory) {
        apiUrl += `&category=${selectedCategory}`;
      }
      if (selectedDifficulty) {
        apiUrl += `&difficulty=${selectedDifficulty}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.response_code === 0) {
        const triviaWithShuffledAnswers = data.results.map((item) => ({
          ...item,
          shuffledAnswers: [
            ...item.incorrect_answers,
            item.correct_answer,
          ].sort(() => Math.random() - 0.5),
        }));
        setTrivia(triviaWithShuffledAnswers);
      } else {
        throw new Error(`API Error: Response code ${data.response_code}`);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handler to update selected answer for a question
  function handleAnswerSelect(questionIndex, answer) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }

  // Handlers for category and difficulty selection
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleDifficultyChange(event) {
    setSelectedDifficulty(event.target.value);
  }

  // Calculate score
  const score = answersChecked
    ? trivia.filter(
        (item, index) => selectedAnswers[index] === item.correct_answer
      ).length
    : 0;

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        if (data.trivia_categories) {
          setCategories(data.trivia_categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Get or create session token
  useEffect(() => {
    const getSessionToken = async () => {
      try {
        // Check if token exists in localStorage
        const storedToken = localStorage.getItem("triviaSessionToken");
        const tokenTimestamp = localStorage.getItem("triviaTokenTimestamp");
        // Check if token is still valid (less than 6 hours old)
        const sixHoursInMs = 6 * 60 * 60 * 1000;
        const isTokenValid =
          storedToken &&
          tokenTimestamp &&
          Date.now() - parseInt(tokenTimestamp) < sixHoursInMs;
        if (isTokenValid) {
          setSessionToken(storedToken);
        } else {
          // Request new token from API
          const response = await fetch(
            "https://opentdb.com/api_token.php?command=request"
          );
          const data = await response.json();
          if (data.response_code === 0 && data.token) {
            setSessionToken(data.token);
            localStorage.setItem("triviaSessionToken", data.token);
            localStorage.setItem("triviaTokenTimestamp", Date.now().toString());
          } else {
            throw new Error("Failed to retrieve session token");
          }
        }
      } catch (error) {
        console.error("Error getting session token:", error);
        setError("Failed to initialize session. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getSessionToken();
  }, []);

  // console.log(trivia);

  // Elements
  const multipleChoiceElements = trivia.map((item, index) => {
    return (
      <MultipleChoice
        key={index}
        trivia={item}
        questionIndex={index}
        selectedAnswer={selectedAnswers[index]}
        onAnswerSelect={handleAnswerSelect}
        answersChecked={answersChecked}
      />
    );
  });

  // Show loading state
  if (loading) {
    return (
      <div>
        <Header
          quizStarted={quizStarted}
          onStartQuiz={handleStartQuiz}
          answersChecked={answersChecked}
          score={score}
          totalQuestions={trivia.length}
        />
        <div className="main-content">
          <Loading />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <Header
          quizStarted={quizStarted}
          onStartQuiz={handleStartQuiz}
          onResetQuiz={handleResetQuiz}
          answersChecked={answersChecked}
          score={score}
          totalQuestions={trivia.length}
        />
        <div className="main-content">
          <Error message={error} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        quizStarted={quizStarted}
        onStartQuiz={handleStartQuiz}
        onResetQuiz={handleResetQuiz}
        answersChecked={answersChecked}
        score={score}
        totalQuestions={trivia.length}
      />
      <div className="main-content">
        {!quizStarted ? (
          <Instructions
            categories={categories}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            onCategoryChange={handleCategoryChange}
            onDifficultyChange={handleDifficultyChange}
          />
        ) : (
          multipleChoiceElements
        )}
      </div>
    </div>
  );
}

export default App;
