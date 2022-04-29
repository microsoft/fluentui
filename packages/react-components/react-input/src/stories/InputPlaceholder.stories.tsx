import * as React from 'react';
import { Input } from '../index';

export const Placeholder = () => {
  return <Input placeholder="input with placeholder" aria-label="input with placeholder" />;
};

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'An input can have placeholder text. If using the placeholder as a label (which is not ' +
        'recommended for usability), be sure to provide an `aria-label` for screen reader users.',
    },
  },
};
