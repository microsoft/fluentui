import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { MenuState } from '../Menu/Menu.types';

/**
 * MenuPopover Props
 */
export interface MenuPopoverProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * State used in rendering MenuPopover
 */
export interface MenuPopoverState extends ComponentState<MenuPopoverProps>, Pick<MenuState, 'inline'> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
