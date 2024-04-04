import { NavCategoryItemContextValue } from '../NavCategoryItemContext';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavCategoryItemContextValues = {
  navCategoryItem: NavCategoryItemContextValue;
};

export type NavCategoryItemSlots = {
  /**
   * The root element
   */
  root: Slot<'button'>;
  /**
   * Icon that renders before the content when the item is selected.
   */
  selectedIcon?: Slot<'span'>;

  /**
   * Icon that renders before the content when the item is unselected.
   */
  unSelectedIcon?: Slot<'span'>;
  /**
   * Expand icon slot rendered before (or after) children content in heading.
   */
  expandIcon: NonNullable<Slot<'span'>>;
};

/**
 * navCategoryItem Props
 */
export type NavCategoryItemProps = ComponentProps<Partial<NavCategoryItemSlots>>;

/**
 * State used in rendering NavCategoryItem
 */
export type NavCategoryItemState = ComponentState<NavCategoryItemSlots> &
  NavCategoryItemContextValue & {
    /**
     * If this navCategoryItem is selected
     */
    selected: boolean;
  };
