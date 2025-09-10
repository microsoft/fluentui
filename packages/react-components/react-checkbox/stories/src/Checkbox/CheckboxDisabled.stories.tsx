import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Disabled = (): JSXElement => (
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
