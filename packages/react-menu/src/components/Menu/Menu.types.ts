import * as React from 'react';
import { ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { PositioningProps } from '@fluentui/react-positioning';
import { MenuListProps } from '../MenuList/index';

/**
 * Extends and drills down Menulist props to simplify API
 * {@docCategory Menu }
 */
export interface MenuProps extends MenuListProps {
  /**
   * Explicitly require children
   */

  children: React.ReactNode;
  /**
   * Whether the popup is open
   */
  open?: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: React.SyntheticEvent<HTMLElement>, data: OnOpenChangeData) => void;

  /**
   * Whether the popup is open by default
   */
  defaultOpen?: boolean;

  /**
   * Wrapper to style and add events for the popup
   */
  menuPopup?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Where the menu is positioned with respect to the trigger
   */
  position?: PositioningProps['position'];

  /**
   * How the menu is aligned wtih respect to the trigger
   */
  align?: PositioningProps['align'];

  /*
   * Opens the menu on hover
   */
  onHover?: boolean;

  /**
   * Opens the menu on right click (context menu), removes all other menu open interactions
   */
  onContext?: boolean;
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
  setOpen: (e: React.SyntheticEvent<HTMLElement>, open: boolean) => void;

  /**
   * Internal react node that just simplifies handling children
   */
  menuList: React.ReactNode;

  /**
   * Internal react node that just simplifies handling children
   */
  menuTrigger: React.ReactNode;

  /**
   * Wrapper to style and add events for the popup
   */
  menuPopup: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * The ref for the popup
   */
  menuPopupRef: React.MutableRefObject<HTMLElement>;

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
}

/**
 * Data attached to open/close events
 */
export interface OnOpenChangeData extends Pick<MenuState, 'open'> {}
