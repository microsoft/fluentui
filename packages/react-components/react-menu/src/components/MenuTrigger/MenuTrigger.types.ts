import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import * as React from 'react';

export type MenuTriggerProps = TriggerProps<MenuTriggerChildProps> & {
  /**
   * Disables internal trigger mechanism that ensures a child provided will be a compliant ARIA button.
   * @default false
   */
  disableButtonEnhancement?: boolean;
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
    // eslint-disable-next-line @fluentui/consistent-callback-type
    onMouseEnter: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    // eslint-disable-next-line @fluentui/consistent-callback-type
    onMouseLeave: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    // eslint-disable-next-line @fluentui/consistent-callback-type
    onMouseMove: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    // eslint-disable-next-line @fluentui/consistent-callback-type
    onContextMenu: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
  }
>;

export type MenuTriggerState = {
  children: React.ReactElement | null;
  isSubmenu: boolean;
};
