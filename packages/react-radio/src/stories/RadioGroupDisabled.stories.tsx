import * as React from 'react';
import { Radio, RadioGroup } from '../index';

export const Disabled = () => (
  <RadioGroup defaultValue="A" disabled>
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
    <Radio value="D" label="Option D" />
  </RadioGroup>
);
Disabled.parameters = {
  docs: {
    description: {
      story: 'RadioGroup can be disabled, which disables all Radio items inside.',
    },
  },
};
