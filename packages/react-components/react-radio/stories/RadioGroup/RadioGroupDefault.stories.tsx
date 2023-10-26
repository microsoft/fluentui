import * as React from 'react';

import type { RadioGroupProps } from '@fluentui/react-components';
import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Default = (props: Partial<RadioGroupProps>) => (
  <Field label="Favorite Fruit">
    <RadioGroup {...props}>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);
