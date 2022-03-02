import * as React from 'react';
import { Radio, RadioGroup } from '../index';

export const HorizontalStacked = () => (
  <RadioGroup layout="horizontalStacked">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
    <Radio value="D" label="Option D" />
  </RadioGroup>
);
HorizontalStacked.storyName = 'Layout: horizontalStacked';
HorizontalStacked.parameters = {
  docs: {
    description: {
      story: 'The `horizontalStacked` layout places each radio item in a row, with labels below the radio indicator.',
    },
  },
};
