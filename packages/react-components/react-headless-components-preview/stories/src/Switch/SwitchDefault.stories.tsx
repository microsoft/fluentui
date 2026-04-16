import * as React from 'react';
import { Switch } from '@fluentui/react-headless-components-preview';

const classes = {
  root: 'relative inline-flex cursor-pointer items-center gap-3 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  input: 'peer absolute left-0 top-0 m-0 h-5 w-10 cursor-pointer opacity-0 z-1 focus:outline-none',
  indicator:
    'relative h-5 w-10 rounded-full border border-gray-300 bg-white transition-colors after:absolute after:left-px after:top-px after:h-4 after:w-4 after:rounded-full after:bg-gray-400 after:transition-transform after:content-[""] peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2 peer-disabled:border-gray-200 peer-disabled:bg-gray-50 peer-disabled:after:bg-gray-300',
};

export const Default = (): React.ReactNode => (
  <Switch
    defaultChecked
    label="Enable notifications"
    className={classes.root}
    input={{ className: classes.input }}
    indicator={{ className: classes.indicator }}
  />
);
