import * as React from 'react';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Horizontal = () => (
  <Field label="Favorite Fruit">
    <RadioGroup layout="horizontal">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

Horizontal.storyName = 'Layout: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story: 'The `horizontal` layout places each radio item in a row, with labels after the radio indicator.',
    },
  },
};
