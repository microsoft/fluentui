import * as React from 'react';
import { Divider, ThemeProvider } from '@fluentui/react-windmod-preview';

import { DividerVrScene } from './DividerVrScene';

export const DividerWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <DividerVrScene Divider={Divider} />
  </ThemeProvider>
);
