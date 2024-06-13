import { NavItemValue } from '../NavContext.types';

import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavSize } from '../Nav/Nav.types';

export type NavSubItemSlots = {
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
};

/**
 * NavSubItem Props
 */
export type NavSubItemProps = ComponentProps<NavSubItemSlots> & {
  href?: string;
  /**
   * The value that identifies this NavSubItem when selected.
   */
  value: NavItemValue;
};

/**
 * State used in rendering NavSubItem
 */
export type NavSubItemState = ComponentState<NavSubItemSlots> &
  Pick<NavSubItemProps, 'value'> & {
    /**
     * If this NavSubItem is selected
     */
    selected: boolean;
    /**
     * The size of the NavItem
     *
     * @default 'medium'
     */
    size: NavSize;
  };
