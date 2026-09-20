import * as React from 'react';

import { Field } from '@fluentui/react-modern-components-preview/field';
import { Input } from '@fluentui/react-components';

export const Hint = (): React.ReactNode => (
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
