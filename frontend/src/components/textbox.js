import React, { useState } from "react";

function TextAreaExample() {
  const [essay, setEssay] = useState("");

  const handleEssayChange = (event) => {
    setEssay(event.target.value);
  };

  const submitCode = async () => {
    if (!essay.trim()) {
      alert("Paste some code first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5533/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: essay })
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + data.error);
        return;
      }

      console.log(data);
      alert("Roast Score: " + data.score);

    } catch (error) {
      console.error(error);
      alert("Failed to reach backend.");
    }
  };

  return (
    <div className="TextBox">
      <label>Paste Your Code:</label>

      <textarea
        value={essay}
        onChange={handleEssayChange}
        rows={8}
        cols={70}
        placeholder="Paste your code here..."
      />

      <br />

      <button onClick={submitCode}>
        🔥 ROAST 🔥
      </button>
    </div>
  );
}

export default TextAreaExample;