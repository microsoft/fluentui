import * as React from 'react';
import { Rating } from 'office-ui-fabric-react/lib/Rating';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export const RatingButtonControlledExample: React.FunctionComponent = () => {
  const [currentRating, setCurrentRating] = React.useState(5);
  const currentRatingToggle = () => {
    if (currentRating === 0) {
      setCurrentRating(5);
    } else {
      setCurrentRating(0);
    }
  };

  const getRatingAriaLabel = () => `Rating value is ${currentRating} of 5`;

  return (
    <div>
      <Rating
        rating={currentRating}
        max={5}
        readOnly
        allowZeroStars
        getAriaLabel={getRatingAriaLabel}
        ariaLabelFormat={'Select {0} of {1} stars'}
      />
      <PrimaryButton text={'Click to change rating to ' + (5 - currentRating)} onClick={currentRatingToggle} />
    </div>
  );
};
