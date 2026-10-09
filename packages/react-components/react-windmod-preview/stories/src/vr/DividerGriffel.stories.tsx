import * as React from 'react';
import { Divider, FluentProvider, webLightTheme } from '@fluentui/react-components';

import { DividerVrScene } from './DividerVrScene';

export const DividerGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <DividerVrScene Divider={Divider} />
  </FluentProvider>
);
