import * as React from 'react';
import { ContextualMenu } from './ContextualMenu';
import { IPositionProps } from '../../utilities/positioning';
import { DirectionalHint } from '../../common/DirectionalHint';

export { DirectionalHint } from '../../common/DirectionalHint';

export interface IContextualMenuProps extends React.Props<ContextualMenu>, IPositionProps {
  /**
   * Collection of menu items.
   * @default []
   */
  items: IContextualMenuItem[];

  /**
   * Element to anchor the ContextualMenu to.
   */
  targetElement?: HTMLElement;

  /**
   * Indicator of how the ContextualMenu should be anchored to its targetElement.
   * @default DirectionalHint.rightBottomEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * The gap space between the target element and the callout.
   * @default 0
   */
  gapSpace?: number;

  /**
   * Aria Labelled by labelElementId
   * @default null
   */
  labelElementId?: string;

  /**
   * Whether to focus on the menu when mounted.
   * @default true
   */
  shouldFocusOnMount?: boolean;

  /**
   * Whether the beak should be visible.
   * @default false
   */
  isBeakVisible?: boolean;

  /**
   * Callback when the ContextualMenu tries to close. If dismissAll is true then all
   * submenus will be dismissed.
   */
  onDismiss?: (ev?: any, dismissAll?: boolean) => void;

  /**
   * CSS class to apply to the context menu.
   * @default null
   */
  className?: string;

  /**
   * Whether this menu is a submenu of another menu or not.
   */
  isSubMenu?: boolean;

  /**
   * DOM id to tag the ContextualMenu with, for reference.
   * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
   */
  id?: string;

  /**
   * The beak width of the ContextualMenu beak.
   * @default 16
   */
  beakWidth?: number;

  /**
   * Aria label for accessibility for the ContextualMenu.
   * If none specified no aria label will be applied to the ContextualMenu.
   */
  ariaLabel?: string;

}

export interface IContextualMenuItem {
  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * Text description for the menu item to display
   */
  name: string;

  /**
   * Icon to display next to the menu item
   */
  icon?: string;

  /**
   * Whether the menu item is disabled
   * @defaultvalue false
   */
  isDisabled?: boolean;

  /**
   * [TODO] Not Yet Implemented
   */
  shortCut?: string;

  /**
   * Whether or not this menu item can be checked
   * @defaultvalue false
   */
  canCheck?: boolean;

  /**
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  isChecked?: boolean;

  /**
   * Any custom data the developer wishes to associate with the menu item.
   */
  data?: any;

  /**
   * Callback issued when the menu item is invoked
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) => void;

  /**
   * An optional URL to navigate to upon selection
   */
  href?: string;

  /**
   * A collection of submenu items
   */
  items?: IContextualMenuItem[];

  /**
   * Additional css class to apply to the menu item
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
   * If none is specified, the arai-label attribute will contain the item name
   */
  ariaLabel?: string;

  /**
   * Optional title for displaying text when hovering over an item.
   */
  title?: string;

  /**
   * Method to custom render this menu item
   * @defaultvalue undefined
   */
  onRender?: (item: any) => React.ReactNode;

  /**
   * A function to be executed onMouseDown. This is executed before an onClick event and can
   * be used to interrupt native on click events as well. The click event should still handle
   * the commands. This should only be used in special cases when react and non-react are mixed.
   */
  onMouseDown?: (item: IContextualMenuItem, event: any) => void;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;
}
