import * as React from 'react';

export type MenuTriggerProps = {
  /**
   * Explicitly require single child or render function
   */
  children:
    | (React.ReactElement & { ref?: React.Ref<unknown> })
    | ((props: MenuTriggerChildProps) => React.ReactElement | null);
};

/**
 * Props that are passed to the child of the MenuTrigger when cloned to ensure correct behaviour for the Menu
 */
export type MenuTriggerChildProps = Required<
  Pick<
    React.HTMLAttributes<HTMLElement>,
    'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onContextMenu' | 'onKeyDown' | 'aria-haspopup' | 'id'
  >
> & {
  ref?: React.Ref<never>;
  // aria-expanded should only be present when the menu when it is not a submenu
  'aria-expanded': boolean | undefined;
};

export type MenuTriggerState = {
  children: React.ReactElement | null;
  isSubmenu: boolean;
};
