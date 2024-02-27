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
    /* eslint-disable @nx/workspace-consistent-callback-type -- can't change type of existing callback */
    onMouseEnter: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onMouseLeave: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onMouseMove: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onContextMenu: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    /* eslint-enable @nx/workspace-consistent-callback-type */
  }
>;

export type MenuTriggerState = {
  children: React.ReactElement | null;
  isSubmenu: boolean;
};
