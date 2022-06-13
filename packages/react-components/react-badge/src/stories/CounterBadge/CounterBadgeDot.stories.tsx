import * as React from 'react';

import { CounterBadge } from '../index';

export const Dot = () => <CounterBadge count={0} dot />;

Dot.parameters = {
  docs: {
    description: {
      story: 'A counter badge can display a small dot.',
    },
  },
};
