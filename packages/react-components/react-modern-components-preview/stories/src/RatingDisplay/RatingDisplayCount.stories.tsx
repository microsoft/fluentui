import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-modern-components-preview/rating-display';

export const Count = (): React.ReactNode => {
  return <RatingDisplay value={5} count={1160} />;
};

Count.parameters = {
  docs: {
    description: {
      story:
        "You can specify the total number of ratings being displayed with the `count`. The number will be formatted with a thousands separator according to the user's locale.",
    },
  },
};
