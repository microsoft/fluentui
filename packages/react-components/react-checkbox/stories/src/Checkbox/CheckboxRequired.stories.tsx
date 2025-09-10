import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Required = (): JSXElement => <Checkbox required label="Required" />;
Required.parameters = {
  docs: {
    description: {
      story: 'When a checkbox is marked as `required`, its label also gets the required styling.',
    },
  },
};
