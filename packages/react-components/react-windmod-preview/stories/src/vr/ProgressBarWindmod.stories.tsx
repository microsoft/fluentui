import * as React from 'react';
import { FluentProvider, ProgressBar } from '@fluentui/react-windmod-preview';

import { ProgressBarVrScene } from './ProgressBarVrScene';

export const ProgressBarWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ProgressBarVrScene ProgressBar={ProgressBar} />
  </FluentProvider>
);
