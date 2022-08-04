import * as React from 'react';

export type DialogTriggerAction = 'open' | 'close';

export type DialogTriggerProps = {
  /**
   * Explicitly declare if the trigger is responsible for opening or
   * closing a Dialog visibility state.
   * @default 'open' // if it's outside DialogSurface
   * @default 'close' // if it's inside DialogSurface
   */
  action?: DialogTriggerAction;
  /**
   * Explicitly require single child or render function
   * to inject properties
   */
  children:
    | (React.ReactElement & { ref?: React.Ref<unknown> })
    | ((props: DialogTriggerChildProps) => React.ReactElement | null);
};

/**
 * Props that are passed to the child of the DialogTrigger when cloned to ensure correct behaviour for the Dialog
 */
export type DialogTriggerChildProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onClick' | 'onKeyDown' | 'aria-haspopup'
> & {
  ref?: React.Ref<never>;
};

export type DialogTriggerState = {
  children: React.ReactElement | null;
};
