import * as React from 'react';
import { Switch } from '../index';
import type { SwitchProps } from '../index';

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
