import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';

export const Compact = () => <RatingDisplay compact ratingDisplayLabel={3} ratingDisplayCountLabel={'1,160'} />;

Compact.parameters = {
  docs: {
    description: {
      story: 'You can specify a compact RatingDisplay with `compact`.',
    },
  },
};
