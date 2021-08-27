import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { MenuState } from '../Menu/Menu.types';

/**
 * MenuPopover Props
 */
export interface MenuPopoverProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * State used in rendering MenuPopover
 */
export interface MenuPopoverState extends ComponentState, Pick<MenuState, 'inline'>, React.HTMLAttributes<HTMLElement> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
