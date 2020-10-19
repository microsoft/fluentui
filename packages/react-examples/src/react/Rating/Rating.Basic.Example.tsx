import * as React from 'react';
import { Rating, RatingSize } from '@fluentui/react';

const getRatingComponentAriaLabel = (label: string) => (rating: number, maxRating: number): string => {
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
        getAriaLabel={getRatingComponentAriaLabel('Large stars')}
        ariaLabelFormat="Select {0} of {1} stars"
      />
      Small stars, with 0 stars allowed:
      <Rating
        defaultRating={3}
        allowZeroStars
        max={5}
        getAriaLabel={getRatingComponentAriaLabel('Small stars with 0 stars allowed')}
        ariaLabelFormat="Select {0} of {1} stars"
      />
      10 small stars:
      <Rating
        defaultRating={1}
        max={10}
        getAriaLabel={getRatingComponentAriaLabel('10 small stars')}
        ariaLabelFormat="Select {0} of {1} stars"
      />
      Disabled:
      <Rating
        defaultRating={1}
        max={5}
        disabled
        getAriaLabel={getRatingComponentAriaLabel('Disabled')}
        ariaLabelFormat="Select {0} of {1} stars"
      />
      Half star in readOnly mode:
      <Rating
        max={5}
        rating={2.5}
        getAriaLabel={getRatingComponentAriaLabel('Half star in readOnly mode')}
        readOnly
        ariaLabelFormat="Select {0} of {1} stars"
      />
      Custom icons:
      <Rating
        min={1}
        max={5}
        defaultRating={2.5}
        getAriaLabel={getRatingComponentAriaLabel('Custom icons')}
        ariaLabelFormat="Select {0} of {1} stars"
        icon="StarburstSolid"
        unselectedIcon="Starburst"
      />
    </div>
  );
};
