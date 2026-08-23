import * as React from 'react';
import { FluentProvider, Radio, RadioGroup } from '@fluentui/react-windmod-preview';

import { RadioGroupVrScene } from './RadioGroupVrScene';

export const RadioGroupWindmod = (): React.ReactNode => (
  <FluentProvider>
    <RadioGroupVrScene Radio={Radio} RadioGroup={RadioGroup} />
  </FluentProvider>
);
