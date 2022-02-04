import * as React from 'react';

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = {
  children:
    | (React.ReactElement & { ref?: React.Ref<unknown> })
    | ((props: PopoverTriggerChildProps) => React.ReactNode);
};

/**
 * PopoverTrigger State
 */
export type PopoverTriggerState = {
  children: React.ReactNode;
};

export type PopoverTriggerChildProps = {
  ref?: React.Ref<never>;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  'aria-haspopup' | 'onClick' | 'onMouseEnter' | 'onKeyDown' | 'onMouseLeave' | 'onContextMenu'
>;
