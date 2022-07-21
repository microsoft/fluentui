import * as React from 'react';

export type DialogTriggerAction = 'open' | 'close' | 'toggle';

export type DialogTriggerProps = {
  /**
   * Explicitly declare if the trigger is responsible for opening,
   * closing or toggling a Dialog visibility state.
   * @default toggle
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
export type DialogTriggerChildProps = Required<
  Pick<React.HTMLAttributes<HTMLElement>, 'onClick' | 'onKeyDown' | 'aria-haspopup'>
> & {
  ref?: React.Ref<never>;
};

export type DialogTriggerState = {
  children: React.ReactElement | null;
};
