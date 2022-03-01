import * as React from 'react';
import { Radio, RadioGroup } from '../index';

export const DisabledItem = () => (
  <RadioGroup defaultValue="A">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" disabled />
    <Radio value="D" label="Option D" />
  </RadioGroup>
);
DisabledItem.parameters = {
  docs: {
    description: {
      story: 'Radio items can be disabled individually.',
    },
  },
};
