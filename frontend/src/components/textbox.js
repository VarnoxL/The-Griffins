import React, { useState } from 'react';

function TextAreaExample() {
  const [essay, setEssay] = useState('');

  const handleEssayChange = (event) => {
    setEssay(event.target.value);
  };

  return (
    <div className='TextBox'>
      <label htmlFor="essay-text-area">Paste Your Code:</label>
      <textarea
        id="essay-text-area"
        value={essay}
        onChange={handleEssayChange}
        rows={4} // Optional: sets the visible number of lines
        cols={50} // Optional: sets the visible width
      />
      <p>Your Code: {essay}</p>
    </div>
  );
}

export default TextAreaExample;