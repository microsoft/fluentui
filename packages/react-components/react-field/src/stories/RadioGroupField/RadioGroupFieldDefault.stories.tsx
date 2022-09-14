import * as React from 'react';
import { Radio } from '@fluentui/react-components';
import type { RadioGroupFieldProps } from '@fluentui/react-field';
import { RadioGroupField } from '@fluentui/react-field';

export const Default = (props: Partial<RadioGroupFieldProps>) => (
  <RadioGroupField
    label="Example radio group field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  >
    <Radio value="one" label="Option one" />
    <Radio value="two" label="Option two" />
    <Radio value="three" label="Option three" />
  </RadioGroupField>
);
