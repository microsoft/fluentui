import * as React from 'react';
import { Input } from '../index';

export const Inline = () => (
  <div>
    This is some text with an <Input inline placeholder="inline input" aria-label="inline input" /> inside it.
  </div>
);

Inline.parameters = {
  docs: {
    description: {
      story: 'An input can be rendered inline with text.',
    },
  },
};
