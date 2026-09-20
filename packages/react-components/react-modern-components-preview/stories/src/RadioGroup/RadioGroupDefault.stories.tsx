import * as React from 'react';

import type { RadioGroupProps } from '@fluentui/react-modern-components-preview/radio-group';
import { Field } from '@fluentui/react-components';
import { Radio, RadioGroup } from '@fluentui/react-modern-components-preview/radio-group';

export const Default = (props: Partial<RadioGroupProps>): React.ReactNode => (
  <Field label="Favorite Fruit">
    <RadioGroup {...props}>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
