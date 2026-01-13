# Quizzical - Interactive Trivia Quiz App

A modern, mobile-first trivia quiz application built with React and Vite. Test your knowledge with questions from the Open Trivia Database across various categories and difficulty levels.

## ✨ Features

- **10 Questions Per Quiz** - Curated trivia questions from multiple categories
- **Difficulty Indicators** - Visual icons showing Easy (💡), Medium (◐), and Hard (💀) questions
- **Interactive UI** - Select answers, check your results, and see correct/incorrect feedback
- **Smart Session Management** - Automatic token handling ensures you never see duplicate questions
- **Mobile-First Design** - Optimized for mobile with responsive layout and compact header (60px)
- **Answer Validation** - Color-coded feedback with green for correct and orange for incorrect answers
- **Score Tracking** - Real-time score display in the header
- **Continuous Play** - "Next" button to load new questions seamlessly
- **Clean Typography** - Using Montserrat font family for excellent readability
- **HTML Entity Decoding** - Properly formatted questions and answers using the `he` package

## 🚀 Live Demo

[View Live App](#) _(Add your Netlify URL here after deployment)_

## 📦 Tech Stack

- **React 19.2.0** - Modern UI library
- **Vite 7.2.4** - Lightning-fast build tool
- **Font Awesome 6.5.1** - Icon library for difficulty indicators
- **he** - HTML entity decoder for clean text display
- **Open Trivia DB API** - Question database with session token support

## 🛠️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd scrimba-quizzical-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🌐 Deployment to Netlify

This app is ready for deployment to Netlify. Follow these steps:

### Option 1: Deploy via Netlify UI

1. Build your app locally:

   ```bash
   npm run build
   ```

2. Go to [Netlify](https://app.netlify.com/) and sign in
3. Click "Add new site" > "Deploy manually"
4. Drag and drop the `dist` folder to deploy

### Option 2: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. In Netlify, click "Add new site" > "Import an existing project"
3. Connect your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy site"

### Option 3: Netlify CLI

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### 📝 Additional Netlify Configuration (Optional)

For better SPA routing support, create a `public/_redirects` file:

```
/*    /index.html   200
```

Or create a `netlify.toml` file in the root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Open Trivia Database

### Getting Started

To get started using the Open Trivia DB API, use this URL:

```
https://opentdb.com/api.php?amount=10
```

For more settings or help using the API, read along below.

### Session Tokens

Session Tokens are unique keys that help keep track of the questions the API has already retrieved. By appending a Session Token to an API call, the API will never give you the same question twice.

**Note:** Session Tokens will be deleted after 6 hours of inactivity.

**Using a Session Token:**

```
https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
```

**Retrieve a Session Token:**

```
https://opentdb.com/api_token.php?command=request
```

**Reset a Session Token:**

```
https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE
```

#### Implementation in This App

This Quizzical App includes automatic session token management:

- **Automatic Token Retrieval:** When the app loads, it automatically requests a session token from the API
- **Persistent Storage:** Tokens are stored in localStorage and persist across browser sessions
- **Expiration Handling:** The app tracks token timestamps and automatically requests a new token after 6 hours of inactivity
- **Duplicate Prevention:** With session tokens, you'll never see the same question twice during a session
- **Token Reset:** A "Reset Session & Get New Questions" button allows you to reset your token when all questions are exhausted or when you want a fresh start
- **Automatic Reset:** If the API indicates all questions have been used (Response Code 4), the app automatically resets the token

The session token is seamlessly integrated into all API calls, ensuring a better user experience without manual token management.

### Response Codes

The API appends a "Response Code" to each API call:

- **Code 0:** Success - Results returned successfully
- **Code 1:** No Results - Not enough questions for your query
- **Code 2:** Invalid Parameter - Arguments passed aren't valid
- **Code 3:** Token Not Found - Session Token does not exist
- **Code 4:** Token Empty - Token has returned all possible questions, reset required
- **Code 5:** Rate Limit - Too many requests (max 1 request per 5 seconds per IP)

### Encoding Types

The API returns results in an encoded format to handle Unicode and special characters.

**API Call with Encode Type:**

```
https://opentdb.com/api.php?amount=10&encode=url3986
```

**Example Sentence:** `"Don't forget that π = 3.14 & doesn't equal 3."`

- **Default (HTML Codes):** `Don&#039;t forget that &pi; = 3.14 &amp; doesn&#039;t equal 3.`
- **Legacy URL Encoding:** `Don%27t+forget+that+%CF%80+%3D+3.14+%26+doesn%27t+equal+3.`
- **URL Encoding (RFC 3986):** `Don%27t%20forget%20that%20%CF%80%20%3D%203.14%20%26%20doesn%27t%20equal%203.`
- **Base64 Encoding:** `RG9uJ3QgZm9yZ2V0IHRoYXQgz4AgPSAzLjE0ICYgZG9lc24ndCBlcXVhbCAzLg==`

### Helper API Tools

**Category Lookup** - Returns the entire list of categories and IDs:

```
https://opentdb.com/api_category.php
```

**Category Question Count** - Returns the number of questions in a specific category:

```
https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
```

**Global Question Count** - Returns the total number of questions in the database:

```
https://opentdb.com/api_count_global.php
```

### Limitations

- Only 1 category can be requested per API call
- Maximum of 50 questions can be retrieved per call

### Example API Call

```
https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
```

## Fonts and Icons

This project includes:

### Montserrat Font

The Montserrat font family is included from Google Fonts with weights 400, 500, 600, and 700. To use it in your CSS:

```css
font-family: "Montserrat", sans-serif;
```

### Font Awesome Icons

Font Awesome 6.5.1 is available for free icons. Use icons in your JSX:

```jsx
// Checkmark icon
<i className="fa-solid fa-check"></i>

// X mark for wrong answers
<i className="fa-solid fa-xmark"></i>

// Question icon
<i className="fa-solid fa-circle-question"></i>

// Star icon
<i className="fa-solid fa-star"></i>
```

Browse all available icons at [fontawesome.com/icons](https://fontawesome.com/icons)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Additional Features & Enhancement Ideas

### Priority Features

**Quiz Customization:**

- ✅ **Category Selection** - Fetch categories from API and let users choose (Sports, History, Science, etc.)
- ✅ **Difficulty Filter** - Let users select Easy/Medium/Hard before starting
- ✅ **Settings Menu** - Add hamburger menu icon to return to quiz start and change category/difficulty mid-quiz (`"fa-solid fa-bars"`)
- **Question Type Filter** - Choose Multiple Choice, True/False, or both
- **Number of Questions** - Let users choose 5/10/15/20 questions

### User Experience Enhancements

**Progress & Feedback:**

- **Timer/Countdown** - Add optional time limit per question or for entire quiz
- **Progress Indicator** - Show "Question 3/10" in the header
- **Animated Transitions** - Smooth transitions between questions/states
- **Confetti/Celebration** - Animate when user gets high score (8+/10)
- **Explanation Mode** - Show fun facts about correct answers

### Data & Persistence

**Statistics & History:**

- **Statistics Dashboard** - Track total quizzes, average score, best category, etc.
- **Quiz History** - Show past quiz results with date/time
- **Local Storage** - Save user preferences and statistics
- **Streak Counter** - Track consecutive days of quizzing

### Social & Competitive Features

**Sharing & Competition:**

- **Share Results** - Share score on social media or copy to clipboard
- **Challenge Mode** - Generate shareable quiz code for friends to take same quiz
- **Leaderboard** - Compare scores (local or with backend)
- **Daily Challenge** - Same quiz for all users each day

### Settings & Customization

**Accessibility & Preferences:**

- **Dark Mode** - Toggle light/dark theme
- **Sound Effects** - Toggle sound for correct/incorrect answers
- **Accessibility** - Font size adjustment, high contrast mode
- **Language Support** - Multi-language interface

### Advanced Features

**Gameplay Mechanics:**

- **Timed Mode** - Race against the clock for bonus points
- **Hints System** - Remove wrong answers (limited uses)
- **Multiplayer Mode** - Real-time quiz battles with friends
- **Achievement System** - Unlock badges for milestones
- **Difficulty Progression** - Automatically increase difficulty based on performance

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
