import * as React from 'react';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import type { IContextualMenuItem, IContextualMenuItemProps } from '../../../ContextualMenu';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';
import type { IRefObject } from '../../../Utilities';

export interface IContextualMenuItemWrapperProps extends React.ClassAttributes<IContextualMenuItem> {
  /**
   * Optional callback to access the ContextualMenuSplitButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ContextualMenuItemWrapper>;

  /**
   * The IContextualMenuItem that is used to render the item in the menu.
   */
  item: IContextualMenuItem;

  /**
   * CSS class to apply to the context menu.
   */
  // eslint-disable-next-line deprecation/deprecation
  classNames: IMenuItemClassNames;

  /**
   * The index number of the wrapper among all items in the contextual menu including things like dividers and headers.
   */
  index: number;

  /**
   * The index number of the wrapper among all items in the contextual menu excluding dividers and headers.
   */
  focusableElementIndex: number;

  /**
   * The total number of items in the contextual menu.
   */
  totalItemCount: number;

  /**
   * Whether or not if the item for the wrapper uses checkmarks.
   */
  hasCheckmarks?: boolean;

  /**
   * Whether or not the item for the wrapper uses icons.
   */
  hasIcons?: boolean;

  /**
   * Method to override the render of the individual menu items.
   * @defaultvalue ContextualMenuItem
   */
  contextualMenuItemAs?:
    | React.ComponentClass<IContextualMenuItemProps>
    | React.FunctionComponent<IContextualMenuItemProps>;

  /**
   * Callback for when the user's mouse enters the wrapper.
   */
  onItemMouseEnter?: (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement>,
    target: HTMLElement,
  ) => boolean | void;

  /**
   * Callback for when the user's mouse leaves the wrapper.
   */
  onItemMouseLeave?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback for when the user's mouse moves in the wrapper.
   */
  onItemMouseMove?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>, target: HTMLElement) => void;

  /**
   * Callback for the mousedown event on the icon button in the wrapper.
   */
  onItemMouseDown?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback for when the click event on the primary button.
   */
  executeItemClick?: (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;

  /**
   * Callback for when the click event on the icon button from the wrapper.
   */
  onItemClick?: (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;

  /**
   * Callback for when the click event on the icon button which also takes in a specific HTMLElement
   * that will be focused.
   */
  onItemClickBase?: (
    item: IContextualMenuItem,
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    target: HTMLElement,
  ) => void;

  /**
   * Callback for keyboard events on the wrapper.
   */
  onItemKeyDown?: (item: IContextualMenuItem, ev: React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Callback to get the subMenu ID for an IContextualMenuItem.
   * @deprecated ID relationship between a menu button and menu isn't necessary
   */
  getSubMenuId?: (item: IContextualMenuItem) => string | undefined;

  /**
   * Key of the currently expanded subMenu.
   */
  expandedMenuItemKey?: string;

  /**
   * Callback for touch/pointer events on the split button.
   */
  onTap?: (ev: React.TouchEvent<HTMLElement> | PointerEvent) => void;

  /**
   * This prop will get set by ContextualMenu and can be called to open this item's subMenu, if present.
   */
  openSubMenu?: (item: any, target: HTMLElement) => void;

  /**
   * This prop will get set by ContextualMenu and can be called to close this item's subMenu, if present.
   */
  dismissSubMenu?: () => void;

  /**
   * This prop will get set by ContextualMenu and can be called to close the menu this item belongs to.
   * If dismissAll is true, all menus will be closed.
   */
  dismissMenu?: (ev?: any, dismissAll?: boolean) => void;
}
