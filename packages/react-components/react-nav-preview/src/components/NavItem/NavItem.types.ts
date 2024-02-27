import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemValue } from '../NavContext.types';

export type NavItemSlots = {
  root: Slot<'a'>;

  // TODO - light this up when we get design spec
  // /**
  //  * Icon that renders before the content.
  //  */
  // icon?: Slot<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible.
   */
  content: NonNullable<Slot<'span'>>;
};

/**
 * NavItem Props
 */
export type NavItemProps = ComponentProps<Partial<NavItemSlots>> & {
  /**
   * The value that identifies this navCategoryItem when selected.
   */
  value: NavItemValue;

  /**
   * Destination URL for the link
   */
  href?: string;
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
