import * as React from 'react';
import { FluentProvider, ProgressBar, webLightTheme } from '@fluentui/react-components';

import { ProgressBarVrScene } from './ProgressBarVrScene';

export const ProgressBarGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ProgressBarVrScene ProgressBar={ProgressBar} />
  </FluentProvider>
);
