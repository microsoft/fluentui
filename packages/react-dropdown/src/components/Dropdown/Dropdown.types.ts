import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { PositioningProps } from '@fluentui/react-positioning';
import { DropdownListCommons } from '../DropdownList/index';

/**
 * Extends and drills down Dropdownlist props to simplify API
 * {@docCategory Dropdown }
 */
export interface DropdownCommons extends DropdownListCommons {
  /**
   * Explicitly require children
   */

  children: React.ReactNode;

  /**
   * Set the entire dropdown to a disabled state
   */
  disabled?: boolean;

  idBase: string;

  /**
   * Root dropdown listboxes are rendered out of DOM order on `document.body`,
   * use this to render the listbox in DOM order
   */
  inline?: boolean;

  /**
   * Whether the popup is open
   */
  open: boolean;

  /**
   * Id for the DropdownTrigger element for the aria-controls relationship
   */
  triggerId: string;
}

export interface DropdownProps
  extends ComponentProps,
    Pick<PositioningProps, 'position' | 'align' | 'coverTarget' | 'offset' | 'target'>,
    Partial<DropdownListCommons> {
  /**
   * Whether the popup is open by default
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: DropdownOpenEvents, data: DropdownOpenChangeData) => void;
}

/**
 * {@docCategory Dropdown }
 */
export interface DropdownState extends DropdownCommons, ComponentState {
  /**
   * Ref to the root slot
   */
  ref: React.RefObject<HTMLElement>;

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

  /**
   * The ref for the DropdownTrigger, used for popup positioning
   */
  triggerRef: React.MutableRefObject<HTMLElement>;
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
