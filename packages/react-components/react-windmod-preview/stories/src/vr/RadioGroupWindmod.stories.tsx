import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Radio, RadioGroup } from '@fluentui/react-windmod-preview/radio-group';

import { RadioGroupVrScene } from './RadioGroupVrScene';

export const RadioGroupWindmod = (): React.ReactNode => (
  <FluentProvider>
    <RadioGroupVrScene Radio={Radio} RadioGroup={RadioGroup} />
  </FluentProvider>
);
