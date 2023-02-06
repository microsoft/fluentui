import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Label = () => (
  <Field label="Field label">
    <Input />
  </Field>
);

Label.parameters = {
  docs: {
    description: {
      story: 'The field label is placed above the field component by default.',
    },
  },
};
