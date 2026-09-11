import * as React from 'react';
import { Label } from '@fluentui/react-windmod-preview/label';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { LabelVrScene } from './LabelVrScene';

export const LabelWindmod = (): React.ReactNode => (
  <FluentProvider>
    <LabelVrScene Label={Label} />
  </FluentProvider>
);
