import * as React from 'react';
import { Radio } from '../index';

export const Disabled = () => <Radio label="Example" disabled />;
Disabled.parameters = {
  docs: {
    description: {
      story: 'Radio items can be disabled.',
    },
  },
};
