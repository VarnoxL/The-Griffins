RoastMyCode

Paste your code. Get roasted by AI.

RoastMyCode is a full-stack web app that analyzes user-submitted code and generates a humorous but helpful AI code review. The system evaluates the code, assigns a quality score, explains what’s wrong, and suggests improvements.

## This project was during a hackathon as a AI developer tool using React, Express, and the OpenAI API.

# Tech Stack

### Frontend

- React
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### AI

- OpenAI API

---

# How It Works

1. User pastes code into the textarea.
2. Frontend sends a POST request to the backend.
3. Backend builds a structured prompt for the AI.
4. OpenAI analyzes the code and returns JSON.
5. Backend parses the JSON response.
6. Frontend displays the roast results.

---

# How to Run the Project

## 1. Clone the repository

## 2. Setup Backend

    cd backend
    npm install

## 3. Setup Frontend

    cd frontend
    npm install
    npm start
