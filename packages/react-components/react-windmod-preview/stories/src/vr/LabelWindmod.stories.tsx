import * as React from 'react';
import { FluentProvider, Label } from '@fluentui/react-windmod-preview';

import { LabelVrScene } from './LabelVrScene';

export const LabelWindmod = (): React.ReactNode => (
  <FluentProvider>
    <LabelVrScene Label={Label} />
  </FluentProvider>
);
