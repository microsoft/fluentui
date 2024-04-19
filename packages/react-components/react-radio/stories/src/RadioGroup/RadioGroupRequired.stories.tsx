import * as React from 'react';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const Required = () => (
  <Field label="Favorite Fruit" required>
    <RadioGroup>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'Use the `required` prop to indicate that one of the radio items must be selected. ' +
        'Or, if the RadioGroup is inside a Field, it will inherit the `required` prop from the Field.',
    },
  },
};
