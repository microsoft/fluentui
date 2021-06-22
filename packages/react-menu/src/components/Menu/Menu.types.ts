import * as React from 'react';
import { ShorthandProps } from '@fluentui/react-utilities';
import { PositioningProps, usePopperMouseTarget } from '@fluentui/react-positioning';
import { MenuListProps } from '../MenuList/index';

/**
 * Extends and drills down Menulist props to simplify API
 * {@docCategory Menu }
 */
export interface MenuProps
  extends MenuListProps,
    Pick<PositioningProps, 'position' | 'align' | 'coverTarget' | 'offset' | 'target'> {
  /**
   * Can contain two children including {@see MenuTrigger} and {@see MenuPopover}
   * Alternatively can only contain {@see MenuPopover} if using a custom {@see target}
   */
  children: [JSX.Element, JSX.Element] | JSX.Element;
  /**
   * Whether the popup is open
   */
  open?: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: MenuOpenEvents, data: MenuOpenChangeData) => void;

  /**
   * Whether the popup is open by default
   */
  defaultOpen?: boolean;

  /**
   * Wrapper to style and add events for the popup
   */
  menuPopup?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /*
   * Opens the menu on hover
   */
  openOnHover?: boolean;

  /**
   * Opens the menu on right click (context menu), removes all other menu open interactions
   */
  openOnContext?: boolean;

  /**
   * Root menus are rendered out of DOM order on `document.body`, use this to render the menu in DOM order
   * This option is disregarded for submenus
   */
  inline?: boolean;

  /**
   * Do not dismiss the menu when a menu item is clicked
   */
  persistOnItemClick?: boolean;

  /**
   * Sets the delay for mouse open/close for the popover one mouse enter/leave
   */
  hoverDelay?: number;
}

/**
 * {@docCategory Menu }
 */
export interface MenuState extends MenuProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Whether the popup is open
   */
  open: boolean;

  /**
   * Callback to open/close the popup
   */
  setOpen: (e: MenuOpenEvents, data: MenuOpenChangeData) => void;

  /**
   * Internal react node that just simplifies handling children
   */
  menuPopover: React.ReactNode;

  /**
   * Internal react node that just simplifies handling children
   */
  menuTrigger: React.ReactNode;

  /**
   * The ref for the popup
   */
  menuPopoverRef: React.MutableRefObject<HTMLElement>;

  /**
   * The ref for the MenuTrigger, used for popup positioning
   */
  triggerRef: React.MutableRefObject<HTMLElement>;

  /**
   * Id for the MenuTrigger element for aria relationship
   */
  triggerId: string;

  /**
   * Whether this menu is a submenu
   */
  isSubmenu: boolean;

  /**
   * Anchors the popper to the mouse click for context events
   */
  contextTarget: ReturnType<typeof usePopperMouseTarget>[0];

  /**
   * A callback to set the target of the popper to the mouse click for context events
   */
  setContextTarget: ReturnType<typeof usePopperMouseTarget>[1];
}

/**
 * Data attached to open/close events
 */
export interface MenuOpenChangeData extends Pick<MenuState, 'open'> {
  /**
   * Indicates whether the change of state was a keyboard interaction
   */
  keyboard?: boolean;
  /**
   * indicates whether the request for the open state was bubbled from a nested menu
   */
  bubble?: boolean;
}

/**
 * The supported events that will trigger open/close of the menu
 */
export type MenuOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
