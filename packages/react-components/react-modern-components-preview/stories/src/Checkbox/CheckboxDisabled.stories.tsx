import * as React from 'react';

import { Checkbox } from '@fluentui/react-modern-components-preview/checkbox';

export const Disabled = (): React.ReactNode => (
  <>
    <Checkbox disabled label="Disabled" />
    <Checkbox disabled label="Disabled checked" checked />
    <Checkbox disabled label="Disabled mixed" checked="mixed" />
  </>
);
Disabled.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be disabled.',
    },
  },
};
