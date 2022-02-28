import * as React from 'react';
import { Radio } from '../index';

export const Name = () => (
  <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column' }}>
    <Radio name="radio-name-example" label="Option A" />
    <Radio name="radio-name-example" label="Option B" />
    <Radio name="radio-name-example" label="Option C" />
  </div>
);
Name.parameters = {
  docs: {
    description: {
      story: 'Radio can be grouped without a RadioGroup by setting the same `name` on each Radio item.',
    },
  },
};
