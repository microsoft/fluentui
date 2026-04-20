import * as React from 'react';
<<<<<<< HEAD
import type { JSXElement } from '@fluentui/react-components';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  rootTrigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  nestedTrigger:
    'px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 data-[open]:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  deepTrigger:
    'px-3 py-1.5 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 data-[open]:bg-purple-700 focus-visible:outline-2 focus-visible:outline-purple-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  actionButton:
    'px-3 py-1.5 rounded-md bg-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-300 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs flex flex-col gap-3',
  heading: 'text-sm font-semibold text-gray-900 m-0',
  body: 'text-sm text-gray-600',
  row: 'flex flex-wrap items-center gap-2',
};

const SecondNestedPopover = (): JSXElement => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button className={classes.deepTrigger}>Second nested trigger</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className={classes.heading}>Popover content</h3>
      <div className={classes.body}>This is some popover content.</div>
      <button className={classes.actionButton}>Second nested button</button>
    </PopoverSurface>
  </Popover>
);

const FirstNestedPopover = (): JSXElement => (
||||||| parent of 2135364493 (docs(react-headless-components-preview): add Popover Storybook stories)
=======
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  rootTrigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  nestedTrigger:
    'px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 data-[open]:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  deepTrigger:
    'px-3 py-1.5 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 data-[open]:bg-purple-700 focus-visible:outline-2 focus-visible:outline-purple-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  actionButton:
    'px-3 py-1.5 rounded-md bg-gray-200 text-gray-900 text-sm font-medium hover:bg-gray-300 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs flex flex-col gap-3',
  heading: 'text-sm font-semibold text-gray-900 m-0',
  body: 'text-sm text-gray-600',
  row: 'flex flex-wrap items-center gap-2',
};

const SecondNestedPopover = (): React.ReactNode => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button className={classes.deepTrigger}>Second nested trigger</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className={classes.heading}>Popover content</h3>
      <div className={classes.body}>This is some popover content.</div>
      <button className={classes.actionButton}>Second nested button</button>
    </PopoverSurface>
  </Popover>
);

const FirstNestedPopover = (): React.ReactNode => (
>>>>>>> 2135364493 (docs(react-headless-components-preview): add Popover Storybook stories)
  <Popover trapFocus>
    <PopoverTrigger>
      <button className={classes.nestedTrigger}>First nested trigger</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className={classes.heading}>Popover content</h3>
      <div className={classes.body}>This is some popover content.</div>
      <button className={classes.actionButton}>First nested button</button>
      <div className={classes.row}>
        <SecondNestedPopover />
        <SecondNestedPopover />
      </div>
    </PopoverSurface>
  </Popover>
);

export const Nested = (): React.ReactNode => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button className={classes.rootTrigger}>Root trigger</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className={classes.heading}>Popover content</h3>
      <div className={classes.body}>This is some popover content.</div>
      <div className={classes.row}>
        <button className={classes.actionButton}>Root button</button>
        <FirstNestedPopover />
      </div>
    </PopoverSurface>
  </Popover>
);
