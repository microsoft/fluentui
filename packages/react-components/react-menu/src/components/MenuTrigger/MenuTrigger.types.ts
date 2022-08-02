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
export type MenuTriggerChildProps = React.HTMLAttributes<HTMLElement>;

export type MenuTriggerState = {
  children: React.ReactElement | null;
  isSubmenu: boolean;
};
