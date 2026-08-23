import * as React from 'react';
import { Divider, FluentProvider } from '@fluentui/react-windmod-preview';

import { DividerVrScene } from './DividerVrScene';

export const DividerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DividerVrScene Divider={Divider} />
  </FluentProvider>
);
