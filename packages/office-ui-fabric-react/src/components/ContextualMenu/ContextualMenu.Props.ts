import * as React from 'react';
import { ContextualMenu } from './ContextualMenu';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZoneDirection } from '../../FocusZone';
import { ICalloutProps } from '../../Callout';
import { IButtonProps } from '../../Button';
import {
  IPoint,
  IRectangle
} from '../../Utilities';
import { IContextualMenuItem } from './ContextualMenuItem.Props';

export { IContextualMenuItem, ContextualMenuItemType } from './ContextualMenuItem.Props';
export { DirectionalHint } from '../../common/DirectionalHint';

export interface IContextualMenu {

}

export interface IContextualMenuProps extends React.Props<ContextualMenu> {
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
  items: IButtonProps[];

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
  onItemClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IButtonProps) => void;

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