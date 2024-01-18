import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';

export const Count = () => {
  return <RatingDisplay value={5} count={1160} />;
};

Count.parameters = {
  docs: {
    description: {
      story:
        'You can specify the total number of ratings being displayed with the `count`. The number you enter will be automatically formatted to be more readable.',
    },
  },
};
