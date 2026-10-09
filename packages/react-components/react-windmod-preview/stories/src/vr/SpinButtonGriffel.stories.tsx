import * as React from 'react';
import { FluentProvider, SpinButton, webLightTheme } from '@fluentui/react-components';

import { SpinButtonVrScene } from './SpinButtonVrScene';

export const SpinButtonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SpinButtonVrScene SpinButton={SpinButton} />
  </FluentProvider>
);
