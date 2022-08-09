import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
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
export type MenuTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType, Props = {}> = ARIAButtonResultProps<
  Type,
  Props & {
    'aria-haspopup': 'menu';
    'aria-expanded'?: boolean;
    id: string;
    ref: React.Ref<unknown>;
    onClick: React.MouseEventHandler;
    onKeyDown: React.MouseEventHandler;
    onMouseEnter: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
    onMouseMove: React.MouseEventHandler;
    onContextMenu: React.MouseEventHandler;
  }
>;

export type MenuTriggerState = {
  children: React.ReactElement | null;
  isSubmenu: boolean;
};
