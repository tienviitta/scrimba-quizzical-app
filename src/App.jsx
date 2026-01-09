import { useEffect, useState } from "react";
import Header from "./Header";
import MultipleChoice from "./MultipleChoice";

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
      }
    };

    getSessionToken();
  }, []);

  // Fetch questions when token is available
  useEffect(() => {
    if (!sessionToken) return;
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&token=${sessionToken}`
        );
        const data = await response.json();
        // Handle different response codes
        if (data.response_code === 0) {
          // Success - questions retrieved
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
    };

    fetchQuestions();
  }, [sessionToken]);

  console.log(trivia);

  // Elements
  const multipleChoiceElements = trivia.map((item, index) => {
    return <MultipleChoice key={index} trivia={item} />;
  });

  // Show loading state
  if (loading) {
    return (
      <div>
        <Header />
        <div className="main-content">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading questions...
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <Header />
        <div className="main-content">
          <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="main-content">{multipleChoiceElements}</div>
    </div>
  );
}

export default App;
