import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavCategoryItemContextValue } from '../NavCategoryItemContext';

export type NavCategoryItemContextValues = {
  navCategoryItem: NavCategoryItemContextValue;
};

export type NavCategoryItemSlots = {
  /**
   * The element wrapping the button. By default this is a div, but can be a heading.
   */

  // this likely needs to be updated to some sort of a heading type
  root: Slot<'button'>;

  /**
   * The component to be used as button in heading
   */
  // button: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
  /**
   * Expand icon slot rendered before (or after) children content in heading.
   */
  expandIcon: NonNullable<Slot<'span'>>;
  // /**
  //  * Expand icon slot rendered before (or after) children content in heading.
  //  */
  // icon?: Slot<'div'>;
};

/**
 * navCategoryItem Props
 */
export type NavCategoryItemProps = ComponentProps<Partial<NavCategoryItemSlots>>;

/**
 * State used in rendering NavCategoryItem
 */
export type NavCategoryItemState = ComponentState<NavCategoryItemSlots> & NavCategoryItemContextValue;
