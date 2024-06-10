import { NavSize } from '../Nav/Nav.types';
import { NavCategoryItemContextValue } from '../NavCategoryItemContext';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavCategoryItemContextValues = {
  navCategoryItem: NavCategoryItemContextValue;
};

export type NavCategoryItemSlots = {
  /**
   * The root element
   */
  root: NonNullable<Slot<'button'>>;

  /**
   * Icon that renders before the content.
   * Should be specific to each Category
   */
  icon?: Slot<'span'>;

  /**
   * Expand icon slot rendered after the content to indicate an open and closed state.
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
    /**
     * The size of the NavItem
     *
     * @default 'medium'
     */
    size: NavSize;
  };
