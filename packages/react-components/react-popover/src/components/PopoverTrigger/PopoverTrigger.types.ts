import * as React from 'react';

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = {
  children:
    | (React.ReactElement & { ref?: React.Ref<unknown> })
    | ((props: PopoverTriggerChildProps) => React.ReactElement | null);
};

/**
 * PopoverTrigger State
 */
export type PopoverTriggerState = {
  children: React.ReactElement | null;
};

export type PopoverTriggerChildProps = {
  ref?: React.Ref<never>;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  'aria-haspopup' | 'onClick' | 'onContextMenu' | 'onKeyDown' | 'onMouseEnter' | 'onMouseLeave'
>;
