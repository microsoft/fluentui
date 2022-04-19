import * as React from 'react';
import { Radio, RadioGroup } from '../index';

export const Horizontal = () => (
  <RadioGroup layout="horizontal">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
    <Radio value="D" label="Option D" />
  </RadioGroup>
);
Horizontal.storyName = 'Layout: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story: 'The `horizontal` layout places each radio item in a row, with labels after the radio indicator.',
    },
  },
};
