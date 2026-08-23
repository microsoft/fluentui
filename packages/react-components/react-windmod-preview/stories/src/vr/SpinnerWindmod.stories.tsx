import * as React from 'react';
import { FluentProvider, Spinner } from '@fluentui/react-windmod-preview';

import { SpinnerVrScene } from './SpinnerVrScene';

export const SpinnerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SpinnerVrScene Spinner={Spinner} />
  </FluentProvider>
);
