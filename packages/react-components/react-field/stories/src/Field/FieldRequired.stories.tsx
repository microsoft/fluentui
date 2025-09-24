import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input } from '@fluentui/react-components';

export const Required = (): JSXElement => (
  <Field label="Required field" required>
    <Input />
  </Field>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'When a Field is marked as `required`, the label has a red asterisk, ' +
        'and the input gets the `aria-required` property for accessiblity tools.',
    },
  },
};
