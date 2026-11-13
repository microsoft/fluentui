import * as React from 'react';
import { Checkbox, FluentProvider, webLightTheme } from '@fluentui/react-components';

import { CheckboxVrScene } from './CheckboxVrScene';

export const CheckboxGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <CheckboxVrScene Checkbox={Checkbox} />
  </FluentProvider>
);
