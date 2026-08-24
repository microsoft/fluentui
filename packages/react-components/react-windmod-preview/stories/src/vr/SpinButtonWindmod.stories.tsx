import * as React from 'react';
import { FluentProvider, SpinButton } from '@fluentui/react-windmod-preview';

import { SpinButtonVrScene } from './SpinButtonVrScene';

export const SpinButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SpinButtonVrScene SpinButton={SpinButton} />
  </FluentProvider>
);
