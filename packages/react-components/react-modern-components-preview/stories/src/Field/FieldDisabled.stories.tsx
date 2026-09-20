import * as React from 'react';

import { Field } from '@fluentui/react-modern-components-preview/field';
import { Input } from '@fluentui/react-components';

export const Disabled = (): React.ReactNode => (
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
