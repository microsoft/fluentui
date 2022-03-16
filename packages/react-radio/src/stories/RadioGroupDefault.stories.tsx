import * as React from 'react';
import { Radio, RadioGroup, RadioGroupProps } from '../index';

export const Default = (props: Partial<RadioGroupProps>) => (
  <RadioGroup {...props}>
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
    <Radio value="D" label="Option D" />
  </RadioGroup>
);
