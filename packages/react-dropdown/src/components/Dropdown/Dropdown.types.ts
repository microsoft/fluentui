import * as React from 'react';
import { ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { PositioningProps } from '@fluentui/react-positioning';
import { DropdownListProps } from '../DropdownList/index';

/**
 * Extends and drills down Dropdownlist props to simplify API
 * {@docCategory Dropdown }
 */
export interface DropdownProps
  extends DropdownListProps,
    Pick<PositioningProps, 'position' | 'align' | 'coverTarget' | 'offset'> {
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
  onOpenChange?: (e: DropdownOpenEvents, data: DropdownOpenChangeData) => void;

  /**
   * Whether the popup is open by default
   */
  defaultOpen?: boolean;

  /**
   * Wrapper to style and add events for the popup
   */
  dropdownPopup?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Wrapper to style and add events for the trigger
   */
  dropdownTrigger?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Root dropdown listboxes are rendered out of DOM order on `document.body`,
   * use this to render the listbox in DOM order
   */
  inline?: boolean;
}

/**
 * {@docCategory Dropdown }
 */
export interface DropdownState extends DropdownProps {
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
  setOpen: (e: DropdownOpenEvents, data: DropdownOpenChangeData) => void;

  /**
   * Internal react node that just simplifies handling children
   */
  dropdownList: React.ReactNode;

  /**
   * Internal react node that just simplifies handling children
   */
  dropdownTrigger: React.ReactNode;

  /**
   * Wrapper to style and add events for the popup
   */
  dropdownPopup: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * The ref for the popup
   */
  dropdownPopupRef: React.MutableRefObject<HTMLElement>;

  idBase: string;

  /**
   * The ref for the DropdownTrigger, used for popup positioning
   */
  triggerRef: React.MutableRefObject<HTMLElement>;

  /**
   * Id for the DropdownTrigger element for the aria-controls relationship
   */
  triggerId: string;
}

/**
 * Data attached to open/close events
 */
export interface DropdownOpenChangeData extends Pick<DropdownState, 'open'> {
  /**
   * Indicates whether the change of state was a keyboard interaction
   */
  keyboard: boolean;
}

/**
 * The supported events that will trigger open/close of the dropdown listbox
 */
export type DropdownOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>;
