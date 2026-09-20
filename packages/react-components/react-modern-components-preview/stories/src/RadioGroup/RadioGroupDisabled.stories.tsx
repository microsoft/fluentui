import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { Radio, RadioGroup } from '@fluentui/react-modern-components-preview/radio-group';

export const Disabled = (): React.ReactNode => (
  <Field label="Favorite Fruit">
    <RadioGroup defaultValue="apple" disabled>
      <Radio value="apple" label="Apple" />
      <Radio value="pear" label="Pear" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  </Field>
);

Disabled.parameters = {
  docs: {
    description: {
      story: 'RadioGroup can be disabled, which disables all Radio items inside.',
    },
  },
};
