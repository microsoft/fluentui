import * as React from 'react';
import { FluentProvider, Switch } from '@fluentui/react-windmod-preview';

import { SwitchVrScene } from './SwitchVrScene';

export const SwitchWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SwitchVrScene Switch={Switch} />
  </FluentProvider>
);
