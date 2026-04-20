import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  type PositioningProps,
} from '@fluentui/react-headless-components-preview';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[160px]',
};

export const Default = (props: PositioningProps): React.ReactNode => (
  <Popover positioning={props}>
    <PopoverTrigger>
      <button className={classes.trigger}>Click me</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>Container</PopoverSurface>
  </Popover>
);

Default.argTypes = {
  position: {
    control: 'select',
    options: ['above', 'below', 'before', 'after'],
  },
  align: {
    control: 'select',
    options: ['start', 'center', 'end'],
  },
  offset: {
    control: 'number',
  },
  coverTarget: {
    control: 'boolean',
  },
  fallbackPositions: { control: { disable: true } },
  autoSize: { control: { disable: true } },
};

Default.args = {
  position: 'above',
  align: 'center',
};
