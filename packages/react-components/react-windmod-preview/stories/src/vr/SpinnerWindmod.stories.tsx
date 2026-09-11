import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Spinner } from '@fluentui/react-windmod-preview/spinner';

import { SpinnerVrScene } from './SpinnerVrScene';

export const SpinnerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SpinnerVrScene Spinner={Spinner} />
  </FluentProvider>
);
