import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemValue } from '../NavContext.types';

export type NavItemSlots = {
  root: NonNullable<Slot<'a'>>;

  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;
};

/**
 * NavItem Props
 */
export type NavItemProps = ComponentProps<Partial<NavItemSlots>> & {
  /**
   * The value that identifies this navCategoryItem when selected.
   */
  value: NavItemValue;
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
