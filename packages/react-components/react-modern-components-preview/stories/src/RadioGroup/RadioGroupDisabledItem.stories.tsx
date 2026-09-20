import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { Radio, RadioGroup } from '@fluentui/react-modern-components-preview/radio-group';

export const DisabledItem = (): React.ReactNode => (
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
