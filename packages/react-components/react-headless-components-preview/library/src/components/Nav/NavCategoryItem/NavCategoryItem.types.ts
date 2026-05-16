import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
/** Value stored inside the NavCategoryItem context. */
export type NavCategoryItemContextValue = {
  open: boolean;
  value: string;
};

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
   */
  icon?: Slot<'span'>;

  /**
   * Expand icon slot rendered after content.
   */
  expandIcon?: Slot<'span'>;
};

/**
 * NavCategoryItem Props
 */
export type NavCategoryItemProps = ComponentProps<NavCategoryItemSlots>;

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
