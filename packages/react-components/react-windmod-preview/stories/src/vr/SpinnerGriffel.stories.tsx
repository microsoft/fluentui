import * as React from 'react';
import { FluentProvider, Spinner, webLightTheme } from '@fluentui/react-components';

import { SpinnerVrScene } from './SpinnerVrScene';

export const SpinnerGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SpinnerVrScene Spinner={Spinner} />
  </FluentProvider>
);
