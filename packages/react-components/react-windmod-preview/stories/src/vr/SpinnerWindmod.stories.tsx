import * as React from 'react';
import { Spinner, ThemeProvider } from '@fluentui/react-windmod-preview';

import { SpinnerVrScene } from './SpinnerVrScene';

export const SpinnerWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <SpinnerVrScene Spinner={Spinner} />
  </ThemeProvider>
);
