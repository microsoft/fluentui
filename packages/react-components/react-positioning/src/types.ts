import * as React from 'react';

type Rect = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type OffsetFunctionParam = {
  positionedRect: Rect;
  targetRect: Rect;
  position: Position;
  alignment?: Alignment;
};

export type OffsetObject = { crossAxis?: number; mainAxis: number };

export type OffsetShorthand = number;

export type OffsetFunction = (param: OffsetFunctionParam) => OffsetObject | OffsetShorthand;

export type Offset = OffsetFunction | OffsetObject | OffsetShorthand;

export type Position = 'above' | 'below' | 'before' | 'after';
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center';

export type AutoSize = 'height' | 'height-always' | 'width' | 'width-always' | 'always' | boolean;

export type Boundary = HTMLElement | Array<HTMLElement> | 'clippingParents' | 'scrollParent' | 'window';

export type PositioningImperativeRef = {
  /**
   * Updates the position imperatively.
   * Useful when the position of the target changes from other factors than scrolling of window resize.
   */
  updatePosition: () => void;

  /**
   * Sets the target and updates positioning imperatively.
   * Useful for avoiding double renders with the target option.
   */
  setTarget: (target: HTMLElement | PositioningVirtualElement) => void;
};

export type PositioningVirtualElement = {
  getBoundingClientRect: () => {
    x: number;
    y: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
  };
  contextElement?: Element;
};

export interface PositioningOptions {
  /** Alignment for the component. Only has an effect if used with the @see position option */
  align?: Alignment;

  /** The element which will define the boundaries of the positioned element for the flip behavior. */
  flipBoundary?: Boundary | null;

  /** The element which will define the boundaries of the positioned element for the overflow behavior. */
  overflowBoundary?: Boundary | null;

  /**
   * Position for the component. Position has higher priority than align. If position is vertical ('above' | 'below')
   * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively),
   * then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position;

  /**
   * Enables the position element to be positioned with 'fixed' (default value is position: 'absolute')
   * @default false
   */
  positionFixed?: boolean;

  /**
   * Lets you displace a positioned element from its reference element.
   * This can be useful if you need to apply some margin between them or if you need to fine tune the
   * position according to some custom logic.
   */
  offset?: Offset;

  /**
   * Defines padding between the corner of the popup element and the arrow.
   * Use to prevent the arrow from overlapping a rounded corner, for example.
   */
  arrowPadding?: number;

  /**
   * Applies max-height and max-width on the positioned element to fit it within the available space in viewport.
   * true enables this for both width and height when overflow happens.
   * 'always' applies `max-height`/`max-width` regardless of overflow.
   * 'height' applies `max-height` when overflow happens, and 'width' for `max-width`
   * `height-always` applies `max-height` regardless of overflow, and 'width-always' for always applying `max-width`
   */
  autoSize?: AutoSize;

  /**
   * Modifies position and alignment to cover the target
   */
  coverTarget?: boolean;

  /**
   * Disables automatic repositioning of the component; it will always be placed according to the values of `align` and
   * `position` props, regardless of the size of the component, the reference element or the viewport.
   */
  pinned?: boolean;

  /**
   * When the reference element or the viewport is outside viewport allows a positioned element to be fully in viewport.
   * "all" enables this behavior for all axis.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_disableTether?: boolean | 'all';
}

export interface PositioningProps
  // "positionFixed" & "unstable_disableTether" are not exported as public API (yet)
  extends Omit<PositioningOptions, 'positionFixed' | 'unstable_disableTether'> {
  /** An imperative handle to Popper methods. */
  positioningRef?: React.Ref<PositioningImperativeRef>;

  /**
   * Manual override for the target element. Useful for scenarios where a component accepts user prop to override target
   */
  target?: HTMLElement | PositioningVirtualElement | null;
}

export type PositioningShorthandValue =
  | 'above'
  | 'above-start'
  | 'above-end'
  | 'below'
  | 'below-start'
  | 'below-end'
  | 'before'
  | 'before-top'
  | 'before-bottom'
  | 'after'
  | 'after-top'
  | 'after-bottom';

export type PositioningShorthand = PositioningProps | PositioningShorthandValue;
