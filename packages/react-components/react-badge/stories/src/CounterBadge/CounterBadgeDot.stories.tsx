import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';

export const Dot = (): JSXElement => <CounterBadge count={0} dot />;

Dot.parameters = {
  docs: {
    description: {
      story: 'A counter badge can display a small dot.',
    },
  },
};
