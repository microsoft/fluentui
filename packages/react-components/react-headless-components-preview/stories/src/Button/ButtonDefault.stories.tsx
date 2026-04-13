import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview';

const classes = {
  button:
    'flex items-center justify-center h-10 px-4 m-0 outline-0 border border-transparent rounded-md bg-blue-600 font-inherit text-base font-medium leading-6 text-white select-none cursor-pointer hover:bg-blue-700 hover:data-[disabled]:bg-blue-600 active:bg-blue-800 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] active:data-[disabled]:bg-blue-600 active:data-[disabled]:shadow-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
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
