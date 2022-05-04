import * as React from 'react';
import type { PopperVirtualElement, PositioningShorthand, usePopperMouseTarget } from '@fluentui/react-positioning';
import type { PortalProps } from '@fluentui/react-portal';

/**
 * Determines popover padding and arrow size
 */
export type PopoverSize = 'small' | 'medium' | 'large';

type PopoverCommons = Pick<PortalProps, 'mountNode'> & {
  /**
   * Controls the opening of the Popover
   */
  open: boolean;
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
   * A popover can appear styled with brand or inverted.
   * When not specified, the default style is used.
   */
  appearance?: 'brand' | 'inverted';

  /**
   * Should trap focus
   */
  trapFocus?: boolean;

  /**
   * Configures the position of the Popover
   */
  positioning?: PositioningShorthand;
};

/**
 * Popover Props
 */
export type PopoverProps = Partial<PopoverCommons> & {
  /**
   * Can contain two children including {@link PopoverTrigger} and {@link PopoverSurface}.
   * Alternatively can only contain {@link PopoverSurface} if using a custom `target`.
   */
  children: [JSX.Element, JSX.Element] | JSX.Element;
};

/**
 * Popover State
 */
export type PopoverState = PopoverCommons &
  Pick<PopoverProps, 'children'> & {
    /**
     * Callback to open/close the Popover
     */
    setOpen: (e: OpenPopoverEvents, open: boolean) => void;
    /**
     * Callback to toggle the open state of the Popover
     */
    toggleOpen: (e: OpenPopoverEvents) => void;
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
    setContextTarget: ReturnType<typeof usePopperMouseTarget>[1];

    size: NonNullable<PopoverProps['size']>;

    popoverTrigger: React.ReactElement | undefined;

    popoverSurface: React.ReactElement | undefined;
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
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
