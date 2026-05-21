import type { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import type * as React from 'react';

export type MenuTriggerProps = TriggerProps<MenuTriggerChildProps> & {
  /**
   * Disables internal trigger mechanism that ensures a child provided will be a compliant ARIA button.
   * @default false
   */
  disableButtonEnhancement?: boolean;
};

export type MenuTriggerBaseProps = MenuTriggerProps & {
  /**
   * Pluggable "focus the first focusable element in the menu popover" callback,
   * invoked when an already-open submenu trigger receives the open arrow key.
   *
   * Not provided by the base hook itself - the base hook is intentionally headless
   * and leaves focus discovery to the caller. `useMenuTrigger_unstable` plugs in a
   * Tabster-aware implementation; a headless consumer is expected to supply its own.
   * If omitted, the keyboard handler is a no-op for that case.
   */
  focusFirst?: () => void;
};

/**
 * Props that are passed to the child of the MenuTrigger when cloned to ensure correct behaviour for the Menu
 */
export type MenuTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType, Props = {}> = ARIAButtonResultProps<
  Type,
  Props & {
    'aria-haspopup'?: 'menu';
    'aria-expanded'?: boolean;
    id: string;
    ref: React.Ref<never>;
    /* eslint-disable @nx/workspace-consistent-callback-type -- can't change type of existing callback */
    onMouseEnter: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onMouseLeave: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onMouseMove: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onMouseOver?: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onContextMenu: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    /* eslint-enable @nx/workspace-consistent-callback-type */
  }
>;

export type MenuTriggerState = {
  children: React.ReactElement | null;
  isSubmenu: boolean;
};
