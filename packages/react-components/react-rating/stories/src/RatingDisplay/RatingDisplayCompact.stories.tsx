import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Compact = (): JSXElement => <RatingDisplay compact value={3} count={1160} />;

Compact.parameters = {
  docs: {
    description: {
      story: 'You can specify a compact RatingDisplay with `compact`.',
    },
  },
};
