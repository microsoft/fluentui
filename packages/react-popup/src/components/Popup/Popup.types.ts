import * as React from 'react';
import { PopperOptions } from '@fluentui/react-positioning';
import { PortalProps } from '@fluentui/react-portal';

/**
 * Popup Props
 */
export interface PopupProps
  extends Pick<PopperOptions, 'position' | 'align' | 'offset'>,
    Pick<PortalProps, 'mountNode'> {
  children: React.ReactNode;
  /**
   * Controls the opening of the popup
   */
  open?: boolean;
  /**
   * Used to set the initial open state of the popup in uncontrolled mode
   */
  defaultOpen?: boolean;
  /**
   * Uses a custom target HTML element to anchor the popup
   */
  target?: HTMLElement | null;
  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: OpenPopupEvents, data: OnOpenChangeData) => void;
}

/**
 * Names of the shorthand properties in PopupProps
 */
export const popupShorthandProps = [] as const;

/**
 * Names of PopupProps that have a default value in usePopup
 */
export type PopupDefaultedProps = never;

/**
 * Popup State
 */
export interface PopupState extends PopupProps {
  /**
   * Open state of the popup
   */
  open: boolean;
  /**
   * Callback to open/close the popup
   */
  setOpen: (e: OpenPopupEvents, open: boolean) => void;
  /**
   * Ref of the PopupTrigger
   */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * Ref of the PopupContent
   */
  contentRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * Flag to open the popup by hovering the trigger
   */
  openOnHover?: boolean;
  /**
   * Flag to open the popup as a context menu. Disables all other interactions
   */
  openOnContext?: boolean;
}

/**
 * Data attached to open/close events
 */
export interface OnOpenChangeData extends Pick<PopupState, 'open'> {}

/**
 * The supported events that will trigger open/close of the menu
 */
export type OpenPopupEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
