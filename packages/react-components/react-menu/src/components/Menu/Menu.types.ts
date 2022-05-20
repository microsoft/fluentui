import * as React from 'react';
import { usePopperMouseTarget } from '@fluentui/react-positioning';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { MenuListProps } from '../MenuList/MenuList.types';

export type MenuSlots = {};

/**
 * Extends and drills down Menulist props to simplify API
 */
export type MenuProps = ComponentProps<MenuSlots> &
  Pick<
    MenuListProps,
    'checkedValues' | 'defaultCheckedValues' | 'hasCheckmarks' | 'hasIcons' | 'onCheckedValueChange'
  > & {
    /**
     * Can contain two children including {@link MenuTrigger} and {@link MenuPopover}.
     * Alternatively can only contain {@link MenuPopover} if using a custom `target`.
     */
    children: [JSX.Element, JSX.Element] | JSX.Element;

    /**
     * Whether the popup is open by default
     *
     * @default false
     */
    defaultOpen?: boolean;

    /**
     * Sets the delay for mouse open/close for the popover one mouse enter/leave
     */
    hoverDelay?: number;

    /**
     * Root menus are rendered out of DOM order on `document.body`, use this to render the menu in DOM order
     * This option is disregarded for submenus
     *
     * @default false
     */
    inline?: boolean;

    /**
     * Call back when the component requests to change value
     * The `open` value is used as a hint when directly controlling the component
     */
    onOpenChange?: (e: MenuOpenEvents, data: MenuOpenChangeData) => void;

    /**
     * Whether the popup is open
     *
     * @default false
     */
    open?: boolean;

    /**
     * Opens the menu on right click (context menu), removes all other menu open interactions
     *
     * @default false
     */
    openOnContext?: boolean;

    /**
     * Opens the menu on hover
     *
     * @default false
     */
    openOnHover?: boolean;

    /**
     * Do not dismiss the menu when a menu item is clicked
     *
     * @default false
     */
    persistOnItemClick?: boolean;

    /**
     * Configures the positioned menu
     */
    positioning?: PositioningShorthand;
  };

export type MenuState = ComponentState<MenuSlots> &
  Pick<
    MenuProps,
    | 'defaultCheckedValues'
    | 'hasCheckmarks'
    | 'hasIcons'
    | 'inline'
    | 'onOpenChange'
    | 'openOnContext'
    | 'persistOnItemClick'
  > &
  Required<Pick<MenuProps, 'checkedValues' | 'onCheckedValueChange' | 'open' | 'openOnHover'>> & {
    /**
     * Anchors the popper to the mouse click for context events
     */
    contextTarget: ReturnType<typeof usePopperMouseTarget>[0];

    /**
     * Whether this menu is a submenu
     */
    isSubmenu: boolean;

    /**
     * Internal react node that just simplifies handling children
     */
    menuPopover: React.ReactNode;

    /**
     * The ref for the popup
     */
    menuPopoverRef: React.MutableRefObject<HTMLElement>;

    /**
     * Internal react node that just simplifies handling children
     */
    menuTrigger: React.ReactNode;

    /**
     * A callback to set the target of the popper to the mouse click for context events
     */
    setContextTarget: ReturnType<typeof usePopperMouseTarget>[1];

    /**
     * Callback to open/close the popup
     */
    setOpen: (e: MenuOpenEvents, data: MenuOpenChangeData) => void;

    /**
     * Id for the MenuTrigger element for aria relationship
     */
    triggerId: string;

    /**
     * The ref for the MenuTrigger, used for popup positioning
     */
    triggerRef: React.MutableRefObject<HTMLElement>;
  };

/**
 * Data attached to open/close events
 */
export type MenuOpenChangeData = {
  /**
   * indicates whether the request for the open state was bubbled from a nested menu
   */
  bubble?: boolean;
  /**
   * Indicates whether the change of state was a keyboard interaction
   */
  keyboard?: boolean;
  open: boolean;
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
  | React.FocusEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;
