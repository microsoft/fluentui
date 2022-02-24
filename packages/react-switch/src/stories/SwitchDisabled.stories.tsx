import * as React from 'react';
import { Switch } from '../index';

export const Disabled = () => (
  <>
    <Switch disabled />
    <Switch checked disabled />
  </>
);

Disabled.parameters = {
  docs: {
    description: {
      story: 'A Switch can be disabled.',
    },
  },
};
