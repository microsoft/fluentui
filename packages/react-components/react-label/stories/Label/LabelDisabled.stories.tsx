import * as React from 'react';
import { Label } from '@fluentui/react-components';

export const Disabled = () => (
  <Label disabled required>
    Disabled label
  </Label>
);

Disabled.parameters = {
  docs: {
    description: {
      story:
        'A Label can be disabled.\n' +
        `Since this state does not meet the required accessibility contrast ratio,
      it should be used sparingly and make it clear that there's no interaction with the
      control associated with it.`,
    },
  },
};
