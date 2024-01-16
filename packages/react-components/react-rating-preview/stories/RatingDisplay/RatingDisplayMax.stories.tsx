import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';

export const Max = () => {
  return <RatingDisplay max={10} value={5} ratingDisplayLabel={5} ratingDisplayCountLabel={'1,160'} />;
};

Max.parameters = {
  docs: {
    description: {
      story: 'You can specify the number of elements in the RatingDisplay with the `max` prop.',
    },
  },
};
