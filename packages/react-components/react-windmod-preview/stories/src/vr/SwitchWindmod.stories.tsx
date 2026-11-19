import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Switch } from '@fluentui/react-windmod-preview/switch';

import { SwitchVrScene } from './SwitchVrScene';

export const SwitchWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SwitchVrScene Switch={Switch} />
  </FluentProvider>
);
