import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';

export const Step = () => {
  return <RatingDisplay step={0.5} value={3.5} ratingDisplayLabel={3.5} ratingDisplayCountLabel={'1,160'} />;
};

Step.parameters = {
  docs: {
    description: {
      story: 'You can specify half values in the RatingDisplay with `step={0.5}`.',
    },
  },
};
