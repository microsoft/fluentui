import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';

export const Precision = () => {
  return <Rating precision defaultValue={3.5} />;
};

Precision.parameters = {
  docs: {
    description: {
      story: 'You can specify half values in the Rating with the "precision" prop.',
    },
  },
};
