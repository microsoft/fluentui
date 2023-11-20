import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';

export const Compact = () => {
  return <Rating compact value={4} ratingCountLabel="1,160" />;
};

Compact.parameters = {
  docs: {
    description: {
      story: 'You can use a compact Rating as a representation of the total Rating count.',
    },
  },
};
