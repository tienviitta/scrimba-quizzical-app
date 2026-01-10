export default function Instructions({
  categories,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}) {
  return (
    <div className="instructions">
      <h2>Welcome to Quizzical!</h2>
      <p>
        Test your knowledge with 10 trivia questions from various selectable
        categories. Please select a category and difficulty level to customize
        your quiz or otherwise default to "Any":
      </p>
      <div className="quiz-options">
        <div className="option-group">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            <option value="">Any Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="difficulty-select">Difficulty:</label>
          <select
            id="difficulty-select"
            value={selectedDifficulty}
            onChange={onDifficultyChange}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <h3>How to Play</h3>
      <ul>
        <li>Click an answer to select it</li>
        <li>Click "Check" when you're ready to see your results</li>
        <li>Good luck!</li>
      </ul>
    </div>
  );
}
