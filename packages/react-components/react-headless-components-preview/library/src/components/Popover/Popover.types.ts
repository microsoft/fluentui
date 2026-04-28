import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  EventData,
  EventHandler,
  Slot,
  JSXElement,
} from '@fluentui/react-utilities';
import type { PositioningShorthand, PositioningReturn } from '../../hooks/usePositioning';

/**
 * Events that can trigger Popover open/close changes.
 */
export type OpenPopoverEvents =
  | MouseEvent
  | TouchEvent
  | React.FocusEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

/**
 * Data attached to open/close events. Uses the canonical `EventData` shape so
 * consumers can discriminate on `type` or use the handler directly via
 * `EventHandler<OnOpenChangeData>`.
 */
export type OnOpenChangeData = EventData<string, React.SyntheticEvent | Event> & { open: boolean };

/**
 * Popover Props
 */
export type PopoverProps = {
  /**
   * Can contain two children including `PopoverTrigger` and `PopoverSurface`.
   * Alternatively can only contain `PopoverSurface` if using a custom `target`.
   */
  children: [JSXElement, JSXElement] | JSXElement;

  /** Controlled open state. */
  open?: boolean;

  /**
   * Default open state for uncontrolled mode.
   * @default false
   */
  defaultOpen?: boolean;

  /** Callback when the open state changes. */
  onOpenChange?: EventHandler<OnOpenChangeData>;

  /**
   * Open on hover.
   * @default false
   */
  openOnHover?: boolean;

  /**
   * Open on context menu (right-click).
   * @default false
   */
  openOnContext?: boolean;

  /**
   * Delay in ms before closing on mouse leave.
   * @default 500
   */
  mouseLeaveDelay?: number;

  /**
   * Positioning configuration. Accepts either a full `PositioningProps`
   * object or a shorthand string such as `'below'` / `'above-end'`.
   */
  positioning?: PositioningShorthand;

  /**
   * Display an arrow pointing to the target.
   * @default false
   */
  withArrow?: boolean;

  /**
   * Reserved for the upcoming focus-management iteration. Currently inert —
   * the surface no longer auto-focuses on open.
   *
   * @default false
   */
  disableAutoFocus?: boolean;

  /**
   * Render inline instead of using native popover top-layer.
   * @default false
   */
  inline?: boolean;

  /**
   * DOM node where the `PopoverSurface` is rendered. When provided, the surface is
   * portaled to that node; when omitted, the surface renders in place in the
   * component tree. The native HTML popover top layer still handles visual
   * elevation, so this controls DOM placement rather than stacking.
   */
  mountNode?: HTMLElement | null;
};

/**
 * Popover State
 */
export type PopoverState = Required<Pick<PopoverProps, 'open' | 'inline'>> &
  Pick<
    PopoverProps,
    'onOpenChange' | 'openOnContext' | 'openOnHover' | 'withArrow' | 'disableAutoFocus' | 'mountNode'
  > & {
    setOpen: (e: OpenPopoverEvents, open: boolean) => void;
    toggleOpen: (e: OpenPopoverEvents) => void;
    triggerRef: React.RefObject<HTMLElement | null>;
    contentRef: React.RefObject<HTMLElement | null>;
    arrowRef: React.RefObject<HTMLDivElement | null>;
    popoverTrigger: React.ReactElement | undefined;
    popoverSurface: React.ReactElement | undefined;
    contextTarget: { x: number; y: number } | undefined;
    setContextTarget: (target: { x: number; y: number } | undefined) => void;
    positioning: PositioningReturn;
  };

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = {
  children: React.ReactElement;
  /**
   * Disable ARIA button enhancement on the trigger.
   * @default false
   */
  disableButtonEnhancement?: boolean;
};

/**
 * PopoverTrigger State
 */
export type PopoverTriggerState = {
  children: React.ReactElement | null;
};

/**
 * PopoverSurface Slots
 */
export type PopoverSurfaceSlots = {
  root: Slot<'div'>;
};

export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> & {
  inline: boolean;
  withArrow: boolean | undefined;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  mountNode: HTMLElement | null | undefined;
  'data-open': string;
};

/**
 * Context shared between Popover and its children.
 */
export type PopoverContextValue = Pick<
  PopoverState,
  | 'open'
  | 'setOpen'
  | 'toggleOpen'
  | 'triggerRef'
  | 'contentRef'
  | 'arrowRef'
  | 'openOnHover'
  | 'openOnContext'
  | 'disableAutoFocus'
  | 'withArrow'
  | 'inline'
  | 'mountNode'
> & {
  positioning: {
    targetRef: React.RefCallback<HTMLElement>;
    containerRef: React.RefCallback<HTMLElement>;
  };
};
