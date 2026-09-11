import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { SpinButton } from '@fluentui/react-windmod-preview/spin-button';

import { SpinButtonVrScene } from './SpinButtonVrScene';

export const SpinButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SpinButtonVrScene SpinButton={SpinButton} />
  </FluentProvider>
);
