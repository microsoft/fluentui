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

export type TargetElement = HTMLElement | PositioningVirtualElement;

/**
 * @internal
 */
export interface PositionManager {
  updatePosition: () => void;
  dispose: () => void;
}

export interface UsePositioningReturn {
  // React refs are supposed to be contravariant
  // (allows a more general type to be passed rather than a more specific one)
  // However, Typescript currently can't infer that fact for refs
  // See https://github.com/microsoft/TypeScript/issues/30748 for more information
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetRef: React.MutableRefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerRef: React.MutableRefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arrowRef: React.MutableRefObject<any>;
}

export type OffsetObject = { crossAxis?: number; mainAxis: number };

export type OffsetShorthand = number;

export type OffsetFunction = (param: OffsetFunctionParam) => OffsetObject | OffsetShorthand;

export type Offset = OffsetFunction | OffsetObject | OffsetShorthand;

export type Position = 'above' | 'below' | 'before' | 'after';
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center';

export type AutoSize = 'height' | 'height-always' | 'width' | 'width-always' | 'always' | boolean;
export type NormalizedAutoSize = { applyMaxWidth: boolean; applyMaxHeight: boolean };

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
  setTarget: (target: TargetElement | null) => void;
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

export type SetVirtualMouseTarget = (event: React.MouseEvent | MouseEvent | undefined | null) => void;

/**
 * Internal options for positioning
 */
export interface PositioningOptions {
  /** Alignment for the component. Only has an effect if used with the @see position option */
  align?: Alignment;

  /** The element which will define the boundaries of the positioned element for the flip behavior. */
  flipBoundary?: Boundary | null;

  /** The element which will define the boundaries of the positioned element for the overflow behavior. */
  overflowBoundary?: Boundary | null;

  /**
   * Applies a padding to the overflow bounadry, so that overflow is detected earlier before the
   * positioned surface hits the overflow boundary.
   */
  overflowBoundaryPadding?: number | Partial<{ top: number; end: number; bottom: number; start: number }>;

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
   * @deprecated use `strategy` instead
   */
  positionFixed?: boolean;

  /**
   * Specifies the type of CSS position property to use.
   * @default absolute
   */
  strategy?: 'absolute' | 'fixed';

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
   * Applies styles on the positioned element to fit it within the available space in viewport.
   * - true: set styles for max height/width.
   * - 'height': set styles for max height.
   * - 'width'': set styles for max width.
   * Note that options 'always'/'height-always'/'width-always' are now obsolete, and equivalent to true/'height'/'width'.
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

  /**
   * If flip fails to stop the positioned element from overflowing
   * its boundaries, use a specified fallback positions.
   */
  fallbackPositions?: PositioningShorthandValue[];

  /**
   * Modifies whether popover is positioned using transform.
   * @default true
   */
  useTransform?: boolean;

  /**
   * If false, does not position anything
   */
  enabled?: boolean;

  /**
   * When set, the positioned element matches the chosen dimension(s) of the target element
   */
  matchTargetSize?: 'width';

  /**
   * Called when a position update has finished. Multiple position updates can happen in a single render,
   * since positioning happens outside of the React lifecycle.
   *
   * It's also possible to listen to the custom DOM event `fui-positioningend`
   */
  onPositioningEnd?: () => void;

  /**
   * Disables the resize observer that updates position on target or dimension change
   */
  disableUpdateOnResize?: boolean;
}

/**
 * Public api that allows components using react-positioning to specify positioning options
 */
export interface PositioningProps
  extends Pick<
    PositioningOptions,
    | 'align'
    | 'arrowPadding'
    | 'autoSize'
    | 'coverTarget'
    | 'flipBoundary'
    | 'offset'
    | 'overflowBoundary'
    | 'overflowBoundaryPadding'
    | 'pinned'
    | 'position'
    | 'strategy'
    | 'useTransform'
    | 'matchTargetSize'
    | 'onPositioningEnd'
    | 'disableUpdateOnResize'
  > {
  /** An imperative handle to Popper methods. */
  positioningRef?: React.Ref<PositioningImperativeRef>;

  /**
   * Manual override for the target element. Useful for scenarios where a component accepts user prop to override target
   */
  target?: TargetElement | null;
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
