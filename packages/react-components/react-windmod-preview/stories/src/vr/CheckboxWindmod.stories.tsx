import * as React from 'react';
import { Checkbox, FluentProvider } from '@fluentui/react-windmod-preview';

import { CheckboxVrScene } from './CheckboxVrScene';

export const CheckboxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <CheckboxVrScene Checkbox={Checkbox} />
  </FluentProvider>
);
