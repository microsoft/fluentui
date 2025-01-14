import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemProps } from '../NavItem/NavItem.types';
import { ButtonProps, MenuButtonProps, ToggleButtonProps } from '@fluentui/react-button';
import type { TooltipProps } from '@fluentui/react-tooltip';
import { NavDensity } from '../Nav/Nav.types';
import { NavSubItemProps } from '../NavSubItem/NavSubItem.types';

export type SplitNavItemSlots = {
  /**
   * Root of the component, wrapping the children.
   */
  root: Slot<'div'>;

  /**
   * The NavItem Slot.
   * Will behave as a SubNavItem if it's in an a SubGroup.
   */
  navItem?: NonNullable<Slot<NavItemProps & NavSubItemProps>>;

  /**
   * Basic button slot.
   */
  actionButton?: Slot<ButtonProps>;

  /**
   * Toggle button slot
   */
  toggleButton?: Slot<ToggleButtonProps>;

  /**
   * Menu button slot to stuff more things in when the other two aren't enough.
   */
  menuButton?: Slot<MenuButtonProps>;

  /**
   * Tooltip for the action button.
   */
  actionButtonTooltip?: Slot<TooltipProps>;

  /**
   * Tooltip for the toggle button.
   */
  toggleButtonTooltip?: Slot<TooltipProps>;

  /**
   * Tooltip for the menu button.
   */
  menuButtonTooltip?: Slot<TooltipProps>;
};

/**
 * SplitNavItem Props
 */
export type SplitNavItemProps = ComponentProps<SplitNavItemSlots>;

/**
 * State used in rendering SplitNavItem
 */
export type SplitNavItemState = ComponentState<SplitNavItemSlots> & {
  /**
   * The density of the NavItem
   *
   * @default 'medium'
   */
  density: NavDensity;

  /**
   * A boolean that represents if the main item in the SplitNavItem is a SubNav item.
   * If false, it's a NavItem.
   */
  isSubNav: boolean;
};
