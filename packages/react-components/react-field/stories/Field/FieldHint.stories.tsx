import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Hint = () => (
  <Field label="Example with hint" hint="Hint text should be used sparingly.">
    <Input />
  </Field>
);

Hint.parameters = {
  docs: {
    description: {
      story: 'Hint text provides additional descriptive information about the field.',
    },
  },
};
