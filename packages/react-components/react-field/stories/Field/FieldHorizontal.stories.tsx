import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Horizontal = () => (
  <Field label="Horizontal" orientation="horizontal" hint="Validation message and hint are below the input.">
    <Input />
  </Field>
);

Horizontal.storyName = 'Horizontal Orientation';
Horizontal.parameters = {
  docs: {
    description: {
      story:
        'Setting `orientation="horizontal"` places the label beside the input. The validationMessage and hint ' +
        'still appear below the input.<br />' +
        'The label width is a fixed 33% of the width of the field. This makes it so horizontal fields are aligned ' +
        'when stacked together.',
    },
  },
};
