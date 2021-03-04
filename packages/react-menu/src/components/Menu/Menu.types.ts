import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { MenuListProps } from '../MenuList/index';

/**
 * Extends and drills down Menulist props to simplify API
 * {@docCategory Menu }
 */
export interface MenuProps extends ComponentProps, React.HTMLAttributes<HTMLElement>, MenuListProps {
  /**
   * Whether the popup is open
   */
  open?: boolean;

  /**
   * Whether the popup is open by default
   */
  defaultOpen?: boolean;

  /**
   * Callback to open/close the popup
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Wrapper to style and add events for the popup
   */
  menuPopup?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

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
}
