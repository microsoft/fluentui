import * as React from 'react';
import type {
  PositioningVirtualElement,
  PositioningShorthand,
  SetVirtualMouseTarget,
} from '@fluentui/react-positioning';
import type { PortalProps } from '@fluentui/react-portal';

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
   * Display an arrow pointing to the target.
   *
   * @default false
   */
  withArrow?: boolean;

  /**
   * Call back when the component requests to change value
   * The `open` value is used as a hint when directly controlling the component
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
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
   * Flag to close the Popover when an iframe outside a PopoverSurface is focused
   *
   * @default true
   */
  closeOnIframeFocus?: boolean;

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

  /**
   * Must be used with the `trapFocus` prop
   * Enables older Fluent UI focus trap behavior where the user
   * cannot tab into the window outside of the document. This is now
   * non-standard behavior according to the [HTML dialog spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
   * where the focus trap involves setting outside elements inert.
   *
   * @deprecated this behavior is default provided now, to opt-out of it in favor of standard behavior use the `inertTrapFocus` property
   */
  legacyTrapFocus?: boolean;
  /**
   * Enables standard behavior according to the [HTML dialog spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
   * where the focus trap involves setting outside elements inert,
   * making navigation leak from the trapped area back to the browser toolbar and vice-versa.
   *
   * @default false
   */
  inertTrapFocus?: boolean;

  /**
   * By default Popover focuses the first focusable element in PopoverSurface on open.
   * Specify `disableAutoFocus` to prevent this behavior.
   *
   * @default false
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_disableAutoFocus?: boolean;
};

/**
 * Popover State
 */
export type PopoverState = Pick<
  PopoverProps,
  | 'appearance'
  | 'mountNode'
  | 'onOpenChange'
  | 'openOnContext'
  | 'openOnHover'
  | 'trapFocus'
  | 'withArrow'
  | 'inertTrapFocus'
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
    contextTarget: PositioningVirtualElement | undefined;

    popoverSurface: React.ReactElement | undefined;

    popoverTrigger: React.ReactElement | undefined;

    /**
     * A callback to set the target of the popper to the mouse click for context events
     */
    setContextTarget: SetVirtualMouseTarget;

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
