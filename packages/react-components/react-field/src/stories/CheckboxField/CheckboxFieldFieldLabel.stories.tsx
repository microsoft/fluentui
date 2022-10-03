import * as React from 'react';
import { CheckboxField } from '@fluentui/react-field';

export const FieldLabel = () => <CheckboxField fieldLabel="Example checkbox field label" />;

FieldLabel.parameters = {
  docs: {
    description: {
      story:
        "The `label` prop of CheckboxField is used as the Checkbox's label. If a field label is desired instead, " +
        'the `fieldLabel` prop can be used. It is recommended to only use _one_ of `label` or `fieldLabel`, not both.',
    },
  },
};
