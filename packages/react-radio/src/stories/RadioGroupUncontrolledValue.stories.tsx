import * as React from 'react';
import { Radio, RadioGroup } from '../index';

export const UncontrolledValue = () => (
  <RadioGroup defaultValue="B">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
    <Radio value="D" label="Option D" />
  </RadioGroup>
);
UncontrolledValue.parameters = {
  docs: {
    description: {
      story:
        'The initially selected item can be set by setting the `defaultValue` of RadioGroup. ' +
        'Alternatively, one Radio item can have `defaultChecked` set. ' +
        'Both methods have the same effect, but only one should be used in a given RadioGroup.',
    },
  },
};
