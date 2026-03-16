import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const Required = (): JSXElement => <Switch required label="Required" />;
Required.parameters = {
  docs: {
    description: {
      story: 'When a Switch is marked as `required`, its label also gets the required styling.',
    },
  },
};
