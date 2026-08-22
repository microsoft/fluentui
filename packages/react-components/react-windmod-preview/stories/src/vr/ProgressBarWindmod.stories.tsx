import * as React from 'react';
import { ProgressBar, ThemeProvider } from '@fluentui/react-windmod-preview';

import { ProgressBarVrScene } from './ProgressBarVrScene';

export const ProgressBarWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <ProgressBarVrScene ProgressBar={ProgressBar} />
  </ThemeProvider>
);
