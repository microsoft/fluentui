import * as React from 'react';
import { FluentProvider, Switch, webLightTheme } from '@fluentui/react-components';

import { SwitchVrScene } from './SwitchVrScene';

export const SwitchGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SwitchVrScene Switch={Switch} />
  </FluentProvider>
);
