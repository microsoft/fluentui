import * as React from 'react';
import { CounterBadge, FluentProvider, webLightTheme } from '@fluentui/react-components';

import { CounterBadgeVrScene } from './CounterBadgeVrScene';

export const CounterBadgeGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <CounterBadgeVrScene CounterBadge={CounterBadge} />
  </FluentProvider>
);
