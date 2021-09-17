import * as React from 'react';

/**
 * {@docCategory MenuTrigger }
 */
export type MenuTriggerProps = {
  /**
   * Explicitly require single child or render function
   */
  children: (React.ReactElement & { ref?: React.Ref<unknown> }) | ((props: MenuTriggerChildProps) => React.ReactNode);
};

/**
 * Props that are passed to the child of the MenuTrigger when cloned to ensure correct behaviour for the Menu
 */
export type MenuTriggerChildProps = Required<
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
> & {
  ref?: React.Ref<never>;
};

/**
 * {@docCategory MenuTrigger }
 */
export type MenuTriggerState = MenuTriggerProps;
