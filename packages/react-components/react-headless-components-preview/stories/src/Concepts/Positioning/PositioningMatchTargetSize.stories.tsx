import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import descriptionMd from './PositioningMatchTargetSizeDescription.md';

const classes = {
  wrapper: 'flex flex-col items-start gap-4 m-16',
  trigger:
    'w-[350px] px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 box-border',
};

export const MatchTargetSize = (): React.ReactNode => (
  <div className={classes.wrapper}>
    <Popover open positioning={{ matchTargetSize: 'width' }}>
      <PopoverTrigger>
        <button className={classes.trigger}>Click me</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface}>This popover has the same width as its target anchor</PopoverSurface>
    </Popover>
  </div>
);

MatchTargetSize.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
