import * as React from 'react';
import PopperJS from 'popper.js';

export type Position = 'above' | 'below' | 'before' | 'after';
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center';

export type PopperChildrenFn = (props: PopperChildrenProps) => React.ReactElement;

export interface PositioningProps {
  /**
   * Alignment for the component.
   */
  align?: Alignment;

  /** The element which will define the boundaries of the popper position for the flip behavior. */
  flipBoundary?: PopperJS.Boundary | Element;

  /** The element which will define the boundaries of the popper position for the overflow behavior. */
  overflowBoundary?: PopperJS.Boundary | Element;

  /**
   * Position for the component. Position has higher priority than align. If position is vertical ('above' | 'below')
   * and align is also vertical ('top' | 'bottom') or if both position and align are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position;

  /**
   * Enables the Popper box to position itself in 'fixed' mode (default value is position: 'absolute')
   * @default false
   */
  positionFixed?: boolean;

  /**
   * Offset value to apply to rendered component. Accepts the following units:
   * - px or unit-less, interpreted as pixels
   * - %, percentage relative to the length of the trigger element
   * - %p, percentage relative to the length of the component element
   * - vw, CSS viewport width unit
   * - vh, CSS viewport height unit
   */
  offset?: string;

  /**
   * Disables automatic repositioning of the component; it will always be placed according to the values of `align` and
   * `position` props, regardless of the size of the component, the reference element or the viewport.
   */
  unstable_pinned?: boolean;
}

export interface PopperProps extends PositioningProps {
  /**
   * Ref object containing the pointer node.
   */
  pointerTargetRef?: React.RefObject<Element>;

  /**
   * The content of the Popper box (the element that is going to be repositioned).
   */
  children: PopperChildrenFn | React.ReactElement;

  /**
   * Enables events (resize, scroll).
   * @default true
   */
  enabled?: boolean;

  /**
   * List of modifiers used to modify the offsets before they are applied to the Popper box.
   * They provide most of the functionality of Popper.js.
   */
  modifiers?: PopperJS.Modifiers;

  /**
   * Array of conditions to be met in order to trigger a subsequent render to reposition the elements.
   */
  positioningDependencies?: React.DependencyList;

  /**
   * Ref object containing the target node (the element that we're using as reference for Popper box).
   */
  targetRef: React.RefObject<Element> | PopperJS.ReferenceObject;

  /**
   * Rtl attribute for the component.
   */
  rtl?: boolean;
}

export interface PopperChildrenProps {
  /**
   * Popper's placement.
   */
  placement: PopperJS.Placement;

  /**
   * Function that updates the position of the Popper box, computing the new offsets and applying the new style.
   */
  scheduleUpdate(): void;
}

export type PopperShorthandProps = PositioningProps;
