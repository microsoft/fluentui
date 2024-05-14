import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { NavItemValue } from '../NavContext.types';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSubItemSlots = {
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
};

/**
 * NavSubItem Props
 */
export type NavSubItemProps = ComponentProps<NavSubItemSlots> & {
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
  };
