import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview';

const classes = {
  button:
    'flex items-center justify-center h-10 px-4 m-0 border border-transparent rounded-md bg-gray-900 font-inherit text-base font-medium leading-6 text-white select-none cursor-pointer hover:bg-gray-800 hover:data-[disabled]:bg-gray-900 active:bg-gray-700 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] active:data-[disabled]:bg-gray-900 active:data-[disabled]:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
};

export const Default = (): React.ReactNode => (
  <div className="flex gap-4">
    <Button className={classes.button}>Button</Button>
    <Button className={classes.button} disabled>
      Button disabled
    </Button>
    <Button className={classes.button} disabled disabledFocusable>
      Button disabled focusable
    </Button>
  </div>
);
