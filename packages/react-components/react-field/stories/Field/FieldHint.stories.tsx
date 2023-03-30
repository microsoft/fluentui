import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Hint = () => (
  <Field label="Example with hint" hint="Sample hint text.">
    <Input />
  </Field>
);

Hint.parameters = {
  docs: {
    description: {
      story:
        'The `hint` provides additional descriptive information about the field. ' +
        'Hint text should be used sparingly.',
    },
  },
};
