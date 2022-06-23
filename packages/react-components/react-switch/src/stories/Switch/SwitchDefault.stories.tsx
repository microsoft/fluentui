import * as React from 'react';
import { Switch } from '@fluentui/react-switch';
import type { SwitchProps } from '@fluentui/react-switch';

export const Default = (props: SwitchProps) => <Switch label="This is a switch" {...props} />;

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
