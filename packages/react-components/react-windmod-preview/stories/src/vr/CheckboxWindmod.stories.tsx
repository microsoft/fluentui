import * as React from 'react';
import { Checkbox } from '@fluentui/react-windmod-preview/checkbox';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { CheckboxVrScene } from './CheckboxVrScene';

export const CheckboxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <CheckboxVrScene Checkbox={Checkbox} />
  </FluentProvider>
);
