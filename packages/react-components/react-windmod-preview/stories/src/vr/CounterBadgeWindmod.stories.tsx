import * as React from 'react';
import { CounterBadge } from '@fluentui/react-windmod-preview/badge';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { CounterBadgeVrScene } from './CounterBadgeVrScene';

export const CounterBadgeWindmod = (): React.ReactNode => (
  <FluentProvider>
    <CounterBadgeVrScene CounterBadge={CounterBadge} />
  </FluentProvider>
);
