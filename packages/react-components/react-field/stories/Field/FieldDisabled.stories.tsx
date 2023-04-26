import * as React from 'react';

import { Field, Input } from '@fluentui/react-components';

export const Disabled = () => (
  <Field label="Field with disabled control">
    <Input disabled />
  </Field>
);

Disabled.storyName = 'Disabled control';
Disabled.parameters = {
  docs: {
    description: {
      story:
        'When the control inside the Field is disabled, the label should _not_ be marked disabled. ' +
        'This ensures the label remains readable to users.',
    },
  },
};
