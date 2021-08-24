import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { MenuState } from '../Menu/Menu.types';

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
