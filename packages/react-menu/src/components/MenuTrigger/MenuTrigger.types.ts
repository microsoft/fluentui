import * as React from 'react';

/**
 * {@docCategory MenuTrigger }
 */
export interface MenuTriggerProps {
  /**
   * Explicitly require single child
   */
  children: React.ReactElement;
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
  > {}

/**
 * {@docCategory MenuTrigger }
 */
export interface MenuTriggerState extends MenuTriggerProps {}
