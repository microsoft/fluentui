import * as React from 'react';
import type { PortalProps } from '@fluentui/react-portal';
import type { PopperVirtualElement, PositioningShorthand, usePopperMouseTarget } from '@fluentui/react-positioning';

/**
 * Determines popover padding and arrow size
 */
export type PopoverSize = 'small' | 'medium' | 'large';

/**
 * Popover Props
 */
export type PopoverProps = Pick<PortalProps, 'mountNode'> & {
  /**
   * A popover can appear styled with brand or inverted.
   * When not specified, the default style is used.
   */
  appearance?: 'brand' | 'inverted';

  /**
   * Can contain two children including {@link PopoverTrigger} and {@link PopoverSurface}.
   * Alternatively can only contain {@link PopoverSurface} if using a custom `target`.
   */
  children: [JSX.Element, JSX.Element] | JSX.Element;

  /**
   * Close when scroll outside of it
   *
   * @default false
   */
  closeOnScroll?: boolean;

  /**
   * Used to set the initial open state of the Popover in uncontrolled mode
   *
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Popovers are rendered out of DOM order on `document.body` by default, use this to render the popover in DOM order
   *
   * @default false
   */
  inline?: boolean;

  /**
   * Sets the delay for closing popover on mouse leave
   */
  mouseLeaveDelay?: number;

  /**
   * Do not display the arrow
   */
  noArrow?: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  onOpenChange?: (e: OpenPopoverEvents, data: OnOpenChangeData) => void;

  /**
   * Controls the opening of the Popover
   *
   * @default false
   */
  open?: boolean;

  /**
   * Flag to open the Popover as a context menu. Disables all other interactions
   *
   * @default false
   */
  openOnContext?: boolean;

  /**
   * Flag to open the Popover by hovering the trigger
   *
   * @default false
   */
  openOnHover?: boolean;

  /**
   * Configures the position of the Popover
   */
  positioning?: PositioningShorthand;

  /**
   * Determines popover padding and arrow size
   *
   * @default medium
   */
  size?: PopoverSize;

  /**
   * Should trap focus
   *
   * @default false
   */
  trapFocus?: boolean;
};

/**
 * Popover State
 */
export type PopoverState = Pick<
  PopoverProps,
  'appearance' | 'mountNode' | 'noArrow' | 'onOpenChange' | 'openOnContext' | 'openOnHover' | 'trapFocus'
> &
  Required<Pick<PopoverProps, 'inline' | 'open'>> &
  Pick<PopoverProps, 'children'> & {
    /**
     * Ref of the pointing arrow
     */
    arrowRef: React.MutableRefObject<HTMLDivElement | null>;

    /**
     * Ref of the PopoverSurface
     */
    contentRef: React.MutableRefObject<HTMLElement | null>;

    /**
     * Anchors the popper to the mouse click for context events
     */
    contextTarget: PopperVirtualElement | undefined;

    popoverSurface: React.ReactElement | undefined;

    popoverTrigger: React.ReactElement | undefined;

    /**
     * A callback to set the target of the popper to the mouse click for context events
     */
    setContextTarget: ReturnType<typeof usePopperMouseTarget>[1];

    /**
     * Callback to open/close the Popover
     */
    setOpen: (e: OpenPopoverEvents, open: boolean) => void;

    size: NonNullable<PopoverProps['size']>;

    /**
     * Callback to toggle the open state of the Popover
     */
    toggleOpen: (e: OpenPopoverEvents) => void;

    /**
     * Ref of the PopoverTrigger
     */
    triggerRef: React.MutableRefObject<HTMLElement | null>;
  };

/**
 * Data attached to open/close events
 */
export type OnOpenChangeData = { open: boolean };

/**
 * The supported events that will trigger open/close of the menu
 */
export type OpenPopoverEvents =
  | MouseEvent
  | TouchEvent
  | React.FocusEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;
