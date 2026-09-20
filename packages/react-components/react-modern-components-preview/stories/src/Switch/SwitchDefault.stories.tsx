import * as React from 'react';

import { Switch } from '@fluentui/react-modern-components-preview/switch';
import type { SwitchProps } from '@fluentui/react-modern-components-preview/switch';

export const Default = (props: SwitchProps): React.ReactNode => <Switch label="This is a switch" {...props} />;

Default.argTypes = {
  checked: {
    control: {
      type: 'inline-radio',
      options: [undefined, false, true],
    },
  },
  defaultChecked: {
    control: {
      type: 'inline-radio',
      options: [false, true],
    },
  },
};
