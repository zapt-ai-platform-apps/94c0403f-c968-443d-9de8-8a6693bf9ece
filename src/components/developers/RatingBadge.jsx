import React from 'react';

export default function RatingBadge({ rating }) {
  const numRating = parseFloat(rating);
  
  let badgeClass = '';
  if (numRating >= 0 && numRating <= 2) {
    badgeClass = 'rating-0-2';
  } else if (numRating > 2 && numRating <= 4) {
    badgeClass = 'rating-3-4';
  } else if (numRating > 4 && numRating <= 6) {
    badgeClass = 'rating-5-6';
  } else if (numRating > 6 && numRating <= 8) {
    badgeClass = 'rating-7-8';
  } else {
    badgeClass = 'rating-9-10';
  }
  
  return (
    <div className={`badge ${badgeClass} flex items-center justify-center w-14 h-6`}>
      <span>{numRating.toFixed(1)}</span>
    </div>
  );
}