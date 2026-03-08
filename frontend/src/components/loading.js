import React, { useState, useEffect } from "react";

const messages = [
  "Scanning for spaghetti code...",
  "Counting unnecessary loops...",
  "Looking for StackOverflow copy-paste...",
  "Compiling insults...",
  "Calling senior developer for emotional support..."
];

function LoadingResults({ isLoading }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="progress-bar">
            <div className="progress-fill"></div>
             </div>
        <p className="loading-text">{messages[messageIndex]}</p>
      </div>
    </div>
  );
}

export default LoadingResults;