import * as React from 'react';
import { PopperOptions } from '@fluentui/react-positioning';
import { PortalProps } from '@fluentui/react-portal';

/**
 * Popover Props
 */
export interface PopoverProps
  extends Pick<PopperOptions, 'position' | 'align' | 'offset'>,
    Pick<PortalProps, 'mountNode'> {
  children: React.ReactNode;
  /**
   * Controls the opening of the Popover
   */
  open?: boolean;
  /**
   * Used to set the initial open state of the Popover in uncontrolled mode
   */
  defaultOpen?: boolean;
  /**
   * Uses a custom target HTML element to anchor the Popover
   */
  target?: HTMLElement | null;
  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;
  /**
   * Flag to open the Popover by hovering the trigger
   */
  openOnHover?: boolean;
  /**
   * Flag to open the Popover as a context menu. Disables all other interactions
   */
  openOnContext?: boolean;
}

/**
 * Names of the shorthand properties in PopoverProps
 */
export const PopoverShorthandProps = [] as const;

/**
 * Names of PopoverProps that have a default value in usePopover
 */
export type PopoverDefaultedProps = never;

/**
 * Popover State
 */
export interface PopoverState extends PopoverProps {
  /**
   * Open state of the Popover
   */
  open: boolean;
  /**
   * Callback to open/close the Popover
   */
  setOpen: (e: OpenPopoverEvents, open: boolean) => void;
  /**
   * Ref of the PopoverTrigger
   */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * Ref of the PopoverContent
   */
  contentRef: React.MutableRefObject<HTMLElement | null>;
}

/**
 * Data attached to open/close events
 */
export interface OnOpenChangeData extends Pick<PopoverState, 'open'> {}

/**
 * The supported events that will trigger open/close of the menu
 */
export type OpenPopoverEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
