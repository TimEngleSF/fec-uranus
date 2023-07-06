import React from 'react';
import RatingSummary from './RatingSummary.jsx';
import RatingBreakdownFilter from './RatingBreakdownFilter.jsx';

import './RatingBreakdown.css';

const RatingBreakdown = ({ ratings, numOfReviews, sumOfReviews, onFilterClick }) => {

  const numOfStars = Object.keys(ratings);
  const sumOfRatings = (numOfStars.reduce(
    (sum, key, index) => (
      sum += key * numOfReviews[index]
    ), 0));
  const average = Math.round(sumOfRatings / sumOfReviews * 10) / 10;
  var floatAverage = (sumOfRatings / sumOfReviews).toFixed(1)

  return (
    <div className='ratingBreakdown reviewsComponent' data-testid='ratingBreakdown'>
      <RatingSummary average={floatAverage} sumOfReviews={sumOfReviews}/>
      <RatingBreakdownFilter ratings={ratings} sumOfReviews={sumOfReviews} onFilterClick={onFilterClick}/>
    </div>
  );
};

export default RatingBreakdown;