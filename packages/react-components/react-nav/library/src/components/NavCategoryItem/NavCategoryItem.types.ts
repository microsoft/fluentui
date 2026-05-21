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
 * Base slots for NavCategoryItem, excluding design/animation-specific slots.
 */
export type NavCategoryItemBaseSlots = Omit<NavCategoryItemSlots, 'expandIconMotion'>;

/**
 * navCategoryItem Props
 */
export type NavCategoryItemProps = ComponentProps<Partial<NavCategoryItemSlots>>;

/**
 * Base NavCategoryItemProps, excluding design/animation-specific props.
 */
export type NavCategoryItemBaseProps = ComponentProps<Partial<NavCategoryItemBaseSlots>>;

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

/**
 * State used in rendering NavCategoryItem, excluding design/animation-specific state.
 */
export type NavCategoryItemBaseState = ComponentState<NavCategoryItemBaseSlots> &
  Pick<NavCategoryItemState, 'open' | 'value' | 'selected'>;
