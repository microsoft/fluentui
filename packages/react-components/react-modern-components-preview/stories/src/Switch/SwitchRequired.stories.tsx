import * as React from 'react';

import { Switch } from '@fluentui/react-modern-components-preview/switch';

export const Required = (): React.ReactNode => <Switch required label="Required" />;
Required.parameters = {
  docs: {
    description: {
      story: 'When a Switch is marked as `required`, its label also gets the required styling.',
    },
  },
};
