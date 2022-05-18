import * as React from 'react';
import { Switch } from '../index';

export const Required = () => <Switch required label="Required" />;
Required.parameters = {
  docs: {
    description: {
      story: 'When a Switch is marked as `required`, its label also gets the required styling.',
    },
  },
};
