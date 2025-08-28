import { NavItemValue } from '../NavContext.types';
import { NavDensity } from '../Nav/Nav.types';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavItemSlots = {
  /**
   * The root element of the NavItem.
   */
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;

  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;
};

/**
 * NavItem Props
 */
export type NavItemProps = ComponentProps<NavItemSlots> & {
  /**
   * Destination where the nav item points to.
   */
  href?: string;
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

    /**
     * The density of the NavItem
     *
     * @default 'medium'
     */
    density: NavDensity;
  };
