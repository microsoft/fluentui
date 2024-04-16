import * as React from 'react';

import { Field, Radio, RadioGroup } from '@fluentui/react-components';

export const DefaultValue = () => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="pear">
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

DefaultValue.parameters = {
  docs: {
    description: {
      story:
        'The initially selected item can be set by setting the `defaultValue` of RadioGroup. ' +
        'Alternatively, one Radio item can have `defaultChecked` set. ' +
        'Both methods have the same effect, but only one should be used in a given RadioGroup.',
    },
  },
};
