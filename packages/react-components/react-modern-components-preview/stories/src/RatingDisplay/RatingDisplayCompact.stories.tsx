import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-modern-components-preview/rating-display';

export const Compact = (): React.ReactNode => <RatingDisplay compact value={3} count={1160} />;

Compact.parameters = {
  docs: {
    description: {
      story: 'You can specify a compact RatingDisplay with `compact`.',
    },
  },
};
