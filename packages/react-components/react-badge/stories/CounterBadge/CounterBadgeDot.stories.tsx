import * as React from 'react';

import { CounterBadge } from '@fluentui/react-components';

export const Dot = () => <CounterBadge count={0} dot />;

Dot.parameters = {
  docs: {
    description: {
      story: 'A counter badge can display a small dot.',
    },
  },
};
