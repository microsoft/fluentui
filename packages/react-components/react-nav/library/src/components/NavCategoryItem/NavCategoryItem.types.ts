import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { NavDensity } from '../Nav/Nav.types';
import type { NavCategoryItemContextValue } from '../NavCategoryItemContext';

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

  /**
   * Expand icon motion slot.
   */
  expandIconMotion?: Slot<PresenceMotionSlotProps>;
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
     * The density of the NavItem
     *
     * @default 'medium'
     */
    density: NavDensity;
  };
