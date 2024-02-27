import { NavItemValue } from '../NavContext.types';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSubItemSlots = {
  root: Slot<'a'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible.
   */
  content: NonNullable<Slot<'span'>>;
};

/**
 * NavSubItem Props
 */
export type NavSubItemProps = ComponentProps<Partial<NavSubItemSlots>> & {
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
