import * as PopperJs from '@popperjs/core';
import * as React from 'react';

export type OffsetFunctionParam = {
  popper: PopperJs.Rect;
  reference: PopperJs.Rect;
  placement: PopperJs.Placement;
};

export type OffsetFunction = (param: OffsetFunctionParam) => [number | null | undefined, number | null | undefined];

export type Offset = OffsetFunction | [number | null | undefined, number | null | undefined];

export type Position = 'above' | 'below' | 'before' | 'after';
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center';

export type AutoSize = 'height' | 'height-always' | 'width' | 'width-always' | 'always' | boolean;

export type Boundary = PopperJs.Boundary | 'scrollParent' | 'window';

export type PopperRefHandle = { updatePosition: () => void };

export type PopperVirtualElement = PopperJs.VirtualElement;

export interface PositioningProps {
  /** Alignment for the component. Only has an effect if used with the @see position option */
  align?: Alignment;

  /** The element which will define the boundaries of the popper position for the flip behavior. */
  flipBoundary?: Boundary;

  /** The element which will define the boundaries of the popper position for the overflow behavior. */
  overflowBoundary?: Boundary;

  /** An imperative handle to Popper methods. */
  popperRef?: React.Ref<PopperRefHandle>;

  /**
   * Position for the component. Position has higher priority than align. If position is vertical ('above' | 'below')
   * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively),
   * then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position;

  /**
   * Lets you displace a popper element from its reference element.
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
   * Applies max-height and max-width on popper to fit it within the available space in viewport.
   * true enables this for both width and height when overflow happens.
   * 'always' applies `max-height`/`max-width` regardless of overflow.
   * 'height' applies `max-height` when overflow happens, and 'width' for `max-width`
   * `height-always` applies `max-height` regardless of overflow, and 'width-always' for always applying `max-width`
   */
  autoSize?: AutoSize;

  /**
   * Manual override for popper target. Useful for scenarios where a component accepts user prop to override target
   */
  target?: HTMLElement | PopperVirtualElement | null;

  /**
   * Modifies position and alignment to cover the target
   */
  coverTarget?: boolean;

  /**
   * Disables automatic repositioning of the component; it will always be placed according to the values of `align` and
   * `position` props, regardless of the size of the component, the reference element or the viewport.
   */
  pinned?: boolean;
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
