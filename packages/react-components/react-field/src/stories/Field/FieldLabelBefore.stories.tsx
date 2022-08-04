import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';

export const LabelBefore = () => (
  <Field
    label="Label before"
    labelPosition="before"
    status="success"
    statusText="Status text appears below the input"
    helperText="Helper text does too"
  >
    <Input />
  </Field>
);

LabelBefore.storyName = 'Label position: before';
LabelBefore.parameters = {
  docs: {
    description: {
      story:
        'The label can be placed before the input. If multiple fields are stacked together and all the same width, ' +
        'the inputs will be vertically aligned as well.',
    },
  },
};
