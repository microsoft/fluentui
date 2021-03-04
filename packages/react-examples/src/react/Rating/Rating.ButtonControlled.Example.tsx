import * as React from 'react';
import { Rating } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

export const RatingButtonControlledExample: React.FunctionComponent = () => {
  const [currentRating, setCurrentRating] = React.useState(5);
  const currentRatingToggle = React.useCallback(() => {
    setCurrentRating(oldRating => (oldRating === 0 ? 5 : 0));
  }, []);

  const getRatingAriaLabel = React.useCallback(() => `Rating value is ${currentRating} of 5`, [currentRating]);

  return (
    <div>
      <Rating
        rating={currentRating}
        max={5}
        readOnly
        allowZeroStars
        getAriaLabel={getRatingAriaLabel}
        ariaLabelFormat="{0} of {1} stars"
      />
      <PrimaryButton onClick={currentRatingToggle}>Click to change rating to {5 - currentRating}</PrimaryButton>
    </div>
  );
};
