import * as React from 'react';
import { Divider } from '@fluentui/react-windmod-preview/divider';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { DividerVrScene } from './DividerVrScene';

export const DividerWindmod = (): React.ReactNode => (
  <FluentProvider>
    <DividerVrScene Divider={Divider} />
  </FluentProvider>
);
