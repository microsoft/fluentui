import * as React from 'react';

export interface MenuTriggerProps {
  /**
   * Explicitly require single child or render function
   */
  children: (React.ReactElement & { ref?: React.Ref<unknown> }) | ((props: MenuTriggerChildProps) => React.ReactNode);
}

/**
 * Props that are passed to the child of the MenuTrigger when cloned to ensure correct behaviour for the Menu
 */
export interface MenuTriggerChildProps
  extends Required<
    Pick<
      React.HTMLAttributes<HTMLElement>,
      | 'onClick'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onContextMenu'
      | 'onKeyDown'
      | 'aria-haspopup'
      | 'aria-expanded'
      | 'id'
    >
  > {
  ref?: React.Ref<never>;
}

export interface MenuTriggerState extends MenuTriggerProps {}
