import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-modern-components-preview/rating-display';

export const Max = (): React.ReactNode => {
  return <RatingDisplay max={10} value={5} />;
};

Max.parameters = {
  docs: {
    description: {
      story: 'You can specify the number of elements in the RatingDisplay with the `max` prop.',
    },
  },
};
