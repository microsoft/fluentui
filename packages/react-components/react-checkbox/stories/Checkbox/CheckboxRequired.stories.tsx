import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';

export const Required = () => <Checkbox required label="Required" />;
Required.parameters = {
  docs: {
    description: {
      story: 'When a checkbox is marked as `required`, its label also gets the required styling.',
    },
  },
};
