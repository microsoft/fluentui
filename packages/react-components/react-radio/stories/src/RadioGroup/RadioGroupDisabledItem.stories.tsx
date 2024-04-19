import * as React from 'react';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const DisabledItem = () => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" disabled />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

DisabledItem.parameters = {
  docs: {
    description: {
      story: 'Radio items can be disabled individually.',
    },
  },
};
