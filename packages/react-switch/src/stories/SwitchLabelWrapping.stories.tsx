import * as React from 'react';
import { Switch } from '../index';

export const LabelWrapping = () => (
  <Switch
    style={{ maxWidth: '400px' }}
    label="Here is an example of a Switch with a long label and it starts to wrap to a second line."
  />
);
LabelWrapping.parameters = {
  docs: {
    description: {
      story:
        'The label will wrap if it is wider than the available space. The Switch track will stay aligned ' +
        'to the first line of text.',
    },
  },
};
