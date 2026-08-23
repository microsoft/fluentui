import * as React from 'react';
import { FluentProvider, Radio, RadioGroup, webLightTheme } from '@fluentui/react-components';

import { RadioGroupVrScene } from './RadioGroupVrScene';

export const RadioGroupGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <RadioGroupVrScene Radio={Radio} RadioGroup={RadioGroup} />
  </FluentProvider>
);
