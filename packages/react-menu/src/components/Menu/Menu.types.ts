import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { usePopperMouseTarget, PositioningShorthand } from '@fluentui/react-positioning';
import { MenuListCommons } from '../MenuList/index';
import { MenuContextValue } from '../../contexts/menuContext';

export type Dummy = 'dummy14';

type MenuCommons = MenuListCommons & {
  /**
   * Whether the popup is open
   */
  open: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: MenuOpenEvents, data: MenuOpenChangeData) => void;

  /**
   * Whether the popup is open by default
   */
  defaultOpen?: boolean;

  /*
   * Opens the menu on hover
   */
  openOnHover: boolean;

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
};

export type MenuSlots = {};

/**
 * Extends and drills down Menulist props to simplify API
 */
export type MenuProps = Partial<MenuCommons> &
  ComponentProps<MenuSlots> & {
    /**
     * Can contain two children including {@link MenuTrigger} and {@link MenuPopover}.
     * Alternatively can only contain {@link MenuPopover} if using a custom `target`.
     */
    children: [JSX.Element, JSX.Element] | JSX.Element;

    /**
     * Configures the positioned menu
     */
    positioning?: PositioningShorthand;
  };

export type MenuState = MenuCommons &
  ComponentState<MenuSlots> & {
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
  };

/**
 * Data attached to open/close events
 */
export type MenuOpenChangeData = {
  open: boolean;
  /**
   * Indicates whether the change of state was a keyboard interaction
   */
  keyboard?: boolean;
  /**
   * indicates whether the request for the open state was bubbled from a nested menu
   */
  bubble?: boolean;
};

export type MenuContextValues = {
  menu: MenuContextValue;
};

/**
 * The supported events that will trigger open/close of the menu
 */
export type MenuOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
