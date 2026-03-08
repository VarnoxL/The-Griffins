import React, { useState } from "react";
import LoadingResults from "./loading";

function TextAreaExample() {
  const [essay, setEssay] = useState("");
  const [language, setLanguage] = useState("unknown");
  const [level, setLevel] = useState("mild");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleEssayChange = (event) => {
    setEssay(event.target.value);
  };

  const submitCode = async () => {
    if (!essay.trim()) {
      alert("Paste some code first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5533/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: essay,
          language,
          level
        })
      });

      const data = await response.json();

if (!response.ok) {
      alert(data.error || "Failed to roast code.");
  return;
}

console.log(data);
setResult(data);

    } catch (error) {
      console.error(error);
      alert("Failed to reach backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="TextBox">

      <LoadingResults isLoading={isLoading} />

      <label>Paste Your Code:</label>

      <textarea
        value={essay}
        onChange={handleEssayChange}
        rows={8}
        cols={70}
        placeholder="Paste your code here..."
      />

      <div className="bottom-controls">

        <button onClick={submitCode} disabled={isLoading}>
          ROAST
        </button>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="c++">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="go">Go</option>
          <option value="unknown">Others</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="brutal">Brutal</option>
        </select>

      </div>

      {/* RESULT CARD (outside bottom-controls) */}
      {result && (
        <div className="result-card">
          

          <div className="score-badge">
            Score: {result.score}/10
          </div>

          <div className="result-section">
            <h3>🔥 Roast</h3>
            <p>{result.roast}</p>
          </div>

          <div className="result-section">
            <h3>📄 Summary</h3>
            <p>{result.summary}</p>
          </div>

          <div className="result-section">
            <h3>⚠️ What’s Wrong</h3>
            <p>{result.whatWrongWithCode}</p>
          </div>

          <div className="result-section">
            <h3>🛠 Improvements</h3>
            <p>{result.improvement}</p>
          </div>

        </div>
      )}

    </div>
  );
}

export default TextAreaExample;