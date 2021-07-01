import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';
import { MenuState } from '../Menu/Menu.types';

/**
 * MenuPopover Props
 */
export interface MenuPopoverProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * State used in rendering MenuPopover
 */
export interface MenuPopoverState extends ComponentStateCompat<MenuPopoverProps>, Pick<MenuState, 'inline'> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
