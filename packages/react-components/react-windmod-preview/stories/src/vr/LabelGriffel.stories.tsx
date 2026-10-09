import * as React from 'react';
import { FluentProvider, Label, webLightTheme } from '@fluentui/react-components';

import { LabelVrScene } from './LabelVrScene';

export const LabelGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <LabelVrScene Label={Label} />
  </FluentProvider>
);
