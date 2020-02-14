import React, { useState } from 'react';

export default function StarRating({ ratingChanged }) {
  const [rating, setRating] = useState(5);
  const stars = [1, 2, 3, 4, 5];

  const handleMouseEnter = e => {
    const hoverInt = parseInt(e.target.innerText);
    setRating(hoverInt);
    ratingChanged(hoverInt);
  };

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <div
          key={index}
          className={'star ' + (index < rating ? 'filled' : '')}
          onMouseEnter={handleMouseEnter}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
