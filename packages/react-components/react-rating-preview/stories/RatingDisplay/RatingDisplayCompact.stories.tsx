import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-rating-preview';

export const Compact = () => <RatingDisplay compact value={3} count={1160} />;

Compact.parameters = {
  docs: {
    description: {
      story: 'You can specify a compact RatingDisplay with `compact`.',
    },
  },
};
