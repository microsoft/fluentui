import * as React from 'react';
import { ContextualMenu } from './ContextualMenu';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZoneDirection } from '../../FocusZone';
import { IIconProps } from '../Icon/Icon.Props';
import { ICalloutProps } from '../../Callout';
import {
  IPoint,
  IRectangle
} from '../../Utilities';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
export { DirectionalHint } from '../../common/DirectionalHint';

export enum ContextualMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2
}

export interface IContextualMenu {

}

export interface IContextualMenuProps extends React.Props<ContextualMenu>, IWithResponsiveModeState {
  /**
   * Optional callback to access the IContextualMenu interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IContextualMenu) => void;

  /**
   * The target that the ContextualMenu should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: HTMLElement | string | MouseEvent;

  /**
   * Deprecated at version 0.72.1 and will no longer exist after 1.0 use 'target' instead.
   * @deprecated
   */
  targetElement?: HTMLElement;

  /**
   * How the element should be positioned
   * @default DirectionalHint.bottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

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
   * If true the context menu will render as the same width as the target element
   * @default false
   */
  useTargetWidth?: boolean;

  /**
   * The bounding rectangle for which the contextual menu can appear in.
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
   * Click handler which is invoked if onClick is not passed for individual contextual
   * menu item
   */
  onItemClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) => void;

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

  /**
   * Direction for arrow navigation of the ContextualMenu. Should only be specified if using custom-rendered menu items.
   * @default FocusZoneDirection.vertical
   */
  arrowDirection?: FocusZoneDirection;

  /**
   * If true the position will not change sides in an attempt to fit the ContextualMenu within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @default false
   */
  directionalHintFixed?: boolean;

  /**
   * Callback for when the contextualmenu has been opened.
   */
  onMenuOpened?: (contextualMenu?: IContextualMenuProps) => void;

  /**
   * Pass in custom callout props
   */
  calloutProps?: ICalloutProps;
}

export interface IContextualMenuItem {
  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * Text description for the menu item to display
   */
  name?: string;

  itemType?: ContextualMenuItemType;

  /**
   * Props that go to the IconComponent
   */
  iconProps?: IIconProps;

  /**
   * Props that go to the IconComponent used for the chevron.
   */
  submenuIconProps?: IIconProps;

  /**
   * Deprecated at v0.69.0 and will no longer exist after 1.0 use IconProps instead.
   * @deprecated
   */
  icon?: string;

  /**
   * Whether the menu item is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Deprecated at v0.65.1 and will be removed by v 1.0. Use 'disabled' instead.
   * @deprecated
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
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
   * @deprecated
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
   * An optional target when using href
   */
  target?: string;

  /**
   * Deprecated at v.80.0 and will be removed by v 1.0. Use 'subMenuProps' instead.
   * @deprecated
   */
  items?: IContextualMenuItem[];

  /**
   * Properties to apply to a submenu to this item.
   * The ContextualMenu will provide default values for 'target', 'onDismiss', 'isSubMenu',
   *  'id', 'shouldFocusOnMount', 'directionalHint', 'className', and 'gapSpace', all of which
   *  can be overridden.
   */
  subMenuProps?: IContextualMenuProps;

  /**
   * Additional css class to apply to the menu item
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Additional styles to apply to the menu item
   * @defaultvalue undefined
   */
  style?: React.CSSProperties;

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
   * Method to custom render this menu item.
   * For keyboard accessibility, the top-level rendered item should be a focusable element
   * (like an anchor or a button) or have the `data-is-focusable` property set to true.
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
