import * as React from 'react';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { NavItemValue } from '../NavContext.types';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavItemSlots = {
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;

  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;
};

/**
 * NavItem Props
 */
export type NavItemProps = ComponentProps<NavItemSlots> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * The value that identifies this navCategoryItem when selected.
     */
    value: NavItemValue;
  };

/**
 * State used in rendering NavItem
 */
export type NavItemState = ComponentState<NavItemSlots> &
  Pick<NavItemProps, 'value'> & {
    /**
     * If this navCategoryItem is selected
     */
    selected: boolean;
  };
