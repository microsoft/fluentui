import * as React from 'react';
<<<<<<< HEAD
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { MenuState } from '../Menu/Menu.types';
=======
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { MenuState } from '../Menu/Menu.types';
>>>>>>> Updates react-menu to use root as slot

export type MenuPopoverSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

/**
 * MenuPopover Props
 */
export interface MenuPopoverProps extends ComponentProps<MenuPopoverSlots> {}

/**
 * State used in rendering MenuPopover
 */
export interface MenuPopoverState extends ComponentState<MenuPopoverSlots>, Pick<MenuState, 'inline'> {}
