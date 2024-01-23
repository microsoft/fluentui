import * as React from 'react';
import { PositioningVirtualElement, SetVirtualMouseTarget } from '@fluentui/react-positioning';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { PortalProps } from '@fluentui/react-portal';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { MenuContextValue } from '../../contexts/menuContext';
import type { MenuListProps } from '../MenuList/MenuList.types';

export type MenuSlots = {};

/**
 * Extends and drills down Menulist props to simplify API
 */
export type MenuProps = ComponentProps<MenuSlots> &
  Pick<PortalProps, 'mountNode'> &
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
    // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
    onOpenChange?: (e: MenuOpenEvent, data: MenuOpenChangeData) => void;

    /**
     * Whether the popup is open
     *
     * @default false
     */
    open?: boolean;

    /**
     * Whether the popup is open by default
     *
     * @default false
     */
    defaultOpen?: boolean;

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

    /**
     * Close when scroll outside of it
     *
     * @default false
     */
    closeOnScroll?: boolean;
  };

export type MenuState = ComponentState<MenuSlots> &
  Required<
    Pick<
      MenuProps,
      | 'hasCheckmarks'
      | 'hasIcons'
      | 'mountNode'
      | 'inline'
      | 'checkedValues'
      | 'onCheckedValueChange'
      | 'open'
      | 'openOnHover'
      | 'closeOnScroll'
      | 'hoverDelay'
      | 'openOnContext'
      | 'persistOnItemClick'
    >
  > & {
    /**
     * Anchors the popper to the mouse click for context events
     */
    contextTarget?: PositioningVirtualElement;

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
    setContextTarget: SetVirtualMouseTarget;

    /**
     * Callback to open/close the popup
     */
    setOpen: (e: MenuOpenEvent, data: MenuOpenChangeData) => void;

    /**
     * Id for the MenuTrigger element for aria relationship
     */
    triggerId: string;

    /**
     * The ref for the MenuTrigger, used for popup positioning
     */
    triggerRef: React.MutableRefObject<HTMLElement>;

    /**
     * Call back when the component requests to change value
     * The `open` value is used as a hint when directly controlling the component
     * @deprecated this property is not used internally anymore,
     * the signature remains just to avoid breaking changes
     */
    onOpenChange?: (e: MenuOpenEvent, data: MenuOpenChangeData) => void;
    /**
     * Default values to be checked on mount
     @deprecated this property is not used internally anymore,
     * the signature remains just to avoid breaking changes
     */
    defaultCheckedValues?: Record<string, string[]>;
  };

export type MenuContextValues = {
  menu: MenuContextValue;
};

/**
 * The supported events that will trigger open/close of the menu
 */
export type MenuOpenEvent = MenuOpenChangeData['event'];
/**
 * @deprecated use MenuOpenEvent instead
 */
export type MenuOpenEvents = MenuOpenEvent;

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
   * @deprecated
   * This should not be used, since `Enter`, `Space` and click should be interpreted as the same thing as a click
   */
  keyboard?: boolean;
  open: boolean;
} & (
  | {
      type: 'menuTriggerContextMenu';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuTriggerClick';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuTriggerMouseEnter';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuTriggerMouseLeave';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuTriggerMouseMove';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuTriggerKeyDown';
      event: React.KeyboardEvent<HTMLElement>;
    }
  | {
      type: 'menuItemClick';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuPopoverMouseEnter';
      event: React.MouseEvent<HTMLElement>;
    }
  | {
      type: 'menuPopoverKeyDown';
      event: React.KeyboardEvent<HTMLElement>;
    }
  | {
      type: 'clickOutside';
      event: MouseEvent | TouchEvent;
    }
  | {
      type: 'scrollOutside';
      event: MouseEvent | TouchEvent;
    }
  | {
      type: 'menuMouseEnter';
      event: MouseEvent | TouchEvent;
    }
);
