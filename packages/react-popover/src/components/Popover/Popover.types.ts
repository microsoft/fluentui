import * as React from 'react';
import { PopperOptions, PopperVirtualElement } from '@fluentui/react-positioning';
import { PortalProps } from '@fluentui/react-portal';
import { ComponentState } from '@fluentui/react-utilities';

/**
 * Determines popover padding and arrow size
 */
export type PopoverSize = 'small' | 'medium' | 'large';

/**
 * Popover Props
 */
export interface PopoverProps
  extends Pick<PopperOptions, 'position' | 'align' | 'offset' | 'coverTarget' | 'target'>,
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
  /**
   * Do not display the arrow
   */
  noArrow?: boolean;
  /**
   * Determines popover padding and arrow size
   * @default medium
   */
  size?: PopoverSize;
  /**
   * Uses brand colour as background
   * Mutually exclusive with `inverted`
   */
  brand?: boolean;
  /**
   * Inverts the foreground/background colour of the popover
   * Mutually exclusive with `brand`
   */
  inverted?: boolean;

  /**
   * Should trap focus
   */
  trapFocus?: boolean;
}

/**
 * Names of the shorthand properties in PopoverProps
 */
export type PopoverShorthandProps = never;

/**
 * Names of PopoverProps that have a default value in usePopover
 */
export type PopoverDefaultedProps = never;

/**
 * Popover State
 */
export interface PopoverState extends ComponentState<PopoverProps, PopoverShorthandProps, PopoverDefaultedProps> {
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
   * Ref of the PopoverSurface
   */
  contentRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * Ref of the pointing arrow
   */
  arrowRef: React.MutableRefObject<HTMLDivElement | null>;
  /**
   * Anchors the popper to the mouse click for context events
   */
  contextTarget: PopperVirtualElement | undefined;
  /**
   * A callback to set the target of the popper to the mouse click for context events
   */
  setContextTarget: React.Dispatch<PopperVirtualElement | undefined>;

  size: NonNullable<PopoverProps['size']>;
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
