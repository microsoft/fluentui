import * as React from 'react';
import { Label, ThemeProvider } from '@fluentui/react-windmod-preview';

import { LabelVrScene } from './LabelVrScene';

export const LabelWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <LabelVrScene Label={Label} />
  </ThemeProvider>
);
