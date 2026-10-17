import * as React from 'react';
import { ProgressBar } from '@fluentui/react-windmod-preview/progress-bar';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { ProgressBarVrScene } from './ProgressBarVrScene';

export const ProgressBarWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ProgressBarVrScene ProgressBar={ProgressBar} />
  </FluentProvider>
);
