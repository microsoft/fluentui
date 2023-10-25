import * as React from 'react';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const HorizontalStacked = () => (
  <Field label="Favorite Fruit">
    <RadioGroup layout="horizontal-stacked">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

HorizontalStacked.storyName = 'Layout: horizontal-stacked';
HorizontalStacked.parameters = {
  docs: {
    description: {
      story: 'The `horizontal-stacked` layout places each radio item in a row, with labels below the radio indicator.',
    },
  },
};
