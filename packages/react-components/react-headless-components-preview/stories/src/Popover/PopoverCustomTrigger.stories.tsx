import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs',
};

type CustomTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomTriggerButton = React.forwardRef<HTMLButtonElement, CustomTriggerProps>((props, ref) => (
  <button ref={ref} {...props} className={classes.trigger}>
    Custom trigger
  </button>
));

export const CustomTrigger = (): React.ReactNode => (
  <Popover>
    <PopoverTrigger>
      <CustomTriggerButton />
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Custom trigger</h3>
      <p className="text-sm text-gray-600">
        Native elements and Fluent components have first-class support as children of <code>PopoverTrigger</code>. To
        use your own component, forward its ref with <code>React.forwardRef</code> so the popover can wire up the
        trigger ref and aria attributes.
      </p>
    </PopoverSurface>
  </Popover>
);
