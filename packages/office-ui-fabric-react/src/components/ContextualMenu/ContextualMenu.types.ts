import * as React from 'react';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IFocusZoneProps } from '../../FocusZone';
import { ICalloutProps } from '../../Callout';
import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IBaseProps, IPoint, IRectangle, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
export { DirectionalHint } from '../../common/DirectionalHint';
import { IContextualMenuItemProps, IContextualMenuItem } from './ContextualMenuItem.types';
import { IContextualMenuClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';

export enum ContextualMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2,
  Section = 3
}

export interface IContextualMenu {}

/**
 * React.Props is deprecated and we're removing it in 6.0. Usage of 'any' should go away with it.
 */
export interface IContextualMenuProps extends IBaseProps<IContextualMenu>, IWithResponsiveModeState {
  /**
   * Optional callback to access the IContextualMenu interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IContextualMenu>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ContextualMenu
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * The target that the ContextualMenu should try to position itself based on.
   * It can be either an Element a querySelector string of a valid Element
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: Element | string | MouseEvent | IPoint | null;

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
   * If true the context menu will have a minimum width equal to the width of the target element
   * @default false
   */
  useTargetAsMinWidth?: boolean;

  /**
   * The bounding rectangle for which the contextual menu can appear in.
   */
  bounds?: IRectangle;

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
   * Whether to focus on the contextual menu container (as opposed to the first menu item).
   * @default null
   */
  shouldFocusOnContainer?: boolean;

  /**
   * Callback when the ContextualMenu tries to close. If dismissAll is true then all
   * submenus will be dismissed.
   */
  onDismiss?: (ev?: any, dismissAll?: boolean) => void;

  /**
   * Click handler which is invoked if onClick is not passed for individual contextual
   * menu item.
   * Returning true will dismiss the menu even if ev.preventDefault() was called.
   */
  onItemClick?: (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ) => boolean | void;

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
   * Callback for when the contextualmenu is being closed (removing from the DOM)
   */
  onMenuDismissed?: (contextualMenu?: IContextualMenuProps) => void;

  /**
   * Pass in custom callout props
   */
  calloutProps?: ICalloutProps;

  /**
   * Optional title to be displayed on top of the menu.
   */
  title?: string;

  /**
   * Method to provide the classnames to style the contextual menu. Default value is the getMenuClassnames func
   * defined in ContextualMenu.classnames.
   * @default getContextualMenuClassNames
   * @deprecated Use `styles` prop of `IContextualMenuProps` to leverage mergeStyle API.
   */
  getMenuClassNames?: (theme: ITheme, className?: string) => IContextualMenuClassNames;

  /** Method to call when trying to render a submenu. */
  onRenderSubMenu?: IRenderFunction<IContextualMenuProps>;

  /**
   * Delay (in milliseconds) to wait before expanding / dismissing a submenu on mouseEnter or mouseLeave
   */
  subMenuHoverDelay?: number;

  /**
   * Method to override the render of the individual menu items
   * @default ContextualMenuItem
   */
  contextualMenuItemAs?:
    | React.ComponentClass<IContextualMenuItemProps>
    | React.StatelessComponent<IContextualMenuItemProps>;

  /**
   * Props to pass down to the FocusZone.
   * NOTE: the default FocusZoneDirection will be used unless a direction
   * is specified in the focusZoneProps (even if other focusZoneProps are defined)
   * @default {direction: FocusZoneDirection.vertical}
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * If specified, renders the ContextualMenu in a hidden state.
   * Use this flag, rather than rendering a ContextualMenu conditionally based on visibility,
   * to improve rendering performance when it becomes visible.
   * Note: When ContextualMenu is hidden its content will not be rendered. It will only render
   * once the ContextualMenu is visible.
   */
  hidden?: boolean;
}

/**
 * React.Props is deprecated and we're removing it in 6.0. Usage of 'any' should go away with it.
 */
export interface IContextualMenuSection extends React.Props<any> {
  /**
   * The items to include inside the section.
   */
  items: IContextualMenuItem[];

  /**
   * The optional section title.
   */
  title?: string;

  /**
   * If set to true, the section will display a divider at the top of the section.
   */
  topDivider?: boolean;

  /**
   * If set to true, the section will display a divider at the bottom of the section.
   */
  bottomDivider?: boolean;
}

export interface IContextualMenuStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert ContextualMenu style props below
}

export interface IContextualMenuStyles {
  /**
   * Style override for the contextual menu title.
   */
  title: IStyle;

  /**
   * Style for the container which parents all menu items.
   */
  container: IStyle;

  /**
   * Base styles for the root element of all ContextualMenus.
   */
  root: IStyle;

  /**
   * Styles for the header item of a ContextualMenu
   */
  header: IStyle;

  /**
   * Styles for the list that contains all menuItems.
   */
  list: IStyle;
}
