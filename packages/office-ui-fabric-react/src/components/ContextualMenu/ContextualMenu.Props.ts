import * as React from 'react';
import { ContextualMenu } from './ContextualMenu';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IIconProps } from '../Icon/Icon.Props';
import { IRectangle } from '../../common/IRectangle';
import { IPoint } from '../../common/IPoint';
export { DirectionalHint } from '../../common/DirectionalHint';

export interface IContextualMenuProps extends React.Props<ContextualMenu> {

  /**
   * The target that the ContextualMenu should try to position itself based on.
   * It can be either an HTMLElement a string indicating the ID of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: HTMLElement | string | MouseEvent;

  /**
   * The element that the ContextualMenu should be positioned based on.
   * If a string is given, that is assumed to be the targetElement's Id
   * The ContextualMenu will then use document.getElementById to get the element.
   * @deprecated use target instead
   */
  targetElement?: HTMLElement;

  /**
   * How the element should be positioned
   * @default DirectionalHint.bottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * The gap between the ContextualMenu and the target
   * @default 0
   */
  gapSpace?: number;

  /**
   * The width of the beak.
   * @default 16
   */
  beakWidth?: number;

  /**
   * The bounding rectangle for which  the contextual menu can appear in.
   */
  bounds?: IRectangle;

  /**
   * If true use a point rather than rectangle to position the ContextualMenu.
   * For example it can be used to position based on a click.
   */
  useTargetPoint?: boolean;

  /**
   * Point used to position the ContextualMenu
   */
  targetPoint?: IPoint;

  /**
   * If true then the beak is visible. If false it will not be shown.
   * @default false
   */
  isBeakVisible?: boolean;

  /**
   * If true the position returned will have the menu element cover the target.
   * If false then it will position next to the target;
   * @default false
   */

  coverTarget?: boolean;
  /**
   * Collection of menu items.
   * @default []
   */
  items: IContextualMenuItem[];

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
   * Aria label for accessibility for the ContextualMenu.
   * If none specified no aria label will be applied to the ContextualMenu.
   */
  ariaLabel?: string;

  /**
   * If true do not render on a new layer. If false render on a new layer.
   * @default false
   */
  doNotLayer?: boolean;

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
   * Props that go to the IconComponent
   */
  iconProps?: IIconProps;

  /**
   * Icon to display next to the menu item
   * @deprecated at .69 and will no longer exist after 1.0 use IconProps instead.
   * If you need to change icon colors you will need to switch entirely to iconProps.
   */
  icon?: string;

  /**
   * Whether the menu item is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * @deprecated
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'disabled' instead.
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
  checked?: boolean;

  /**
   * @deprecated
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
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
