import * as React from 'react';
import { Checkbox } from './index';

export const Disabled = () => (
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
