import * as React from 'react';
import { Rating, RatingSize } from '@fluentui/react';

const getRatingComponentAriaLabel =
  (label: string) =>
  (rating: number, maxRating: number): string => {
    return `${label} rating value is ${rating} of ${maxRating}`;
  };

export const RatingBasicExample: React.FunctionComponent = () => {
  return (
    <div>
      Large stars:
      <Rating
        max={5}
        size={RatingSize.Large}
        defaultRating={1}
        ariaLabel="Large stars"
        ariaLabelFormat="{0} of {1} stars"
      />
      Small stars, with 0 stars allowed:
      <Rating
        defaultRating={3}
        allowZeroStars
        max={5}
        ariaLabel="Small stars with 0 stars allowed"
        ariaLabelFormat="{0} of {1} stars"
      />
      10 small stars:
      <Rating defaultRating={1} max={10} ariaLabel="10 small stars" ariaLabelFormat="{0} of {1} stars" />
      Disabled:
      <Rating defaultRating={1} max={5} disabled ariaLabel="Disabled" ariaLabelFormat="{0} of {1} stars" />
      Half star in readOnly mode:
      <Rating
        max={5}
        rating={2.5}
        getAriaLabel={getRatingComponentAriaLabel('Half star in readOnly mode')}
        readOnly
        ariaLabelFormat="{0} of {1} stars"
      />
      Custom icons:
      <Rating
        min={1}
        max={5}
        defaultRating={2.5}
        ariaLabel="Custom icons"
        ariaLabelFormat="{0} of {1} stars"
        icon="StarburstSolid"
        unselectedIcon="Starburst"
      />
    </div>
  );
};
