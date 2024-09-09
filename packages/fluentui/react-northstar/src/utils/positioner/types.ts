import type {
  Placement,
  Boundary as PopperJsBoundary,
  RootBoundary,
  Rect,
  Padding,
  VirtualElement,
  State,
  Instance,
} from '@popperjs/core';
import * as React from 'react';

// Temporary typings for modifiers

type ModifierProps<Name, Options> = {
  enabled?: boolean;
  name: Name;
  options?: Options;
};

export type ArrowModifier = ModifierProps<
  'arrow',
  Partial<{
    element: HTMLElement | string;
    padding: Padding;
  }>
>;

export type FlipModifier = ModifierProps<
  'flip',
  Partial<{
    fallbackPlacements: Placement[];
    padding: Padding;
    boundary: PopperJsBoundary;
    rootBoundary: RootBoundary;
    altBoundary: boolean;
    flipVariations: boolean;
  }>
>;

export type OffsetFunctionParam = {
  popper: Rect;
  reference: Rect;
  placement: Placement;
};

export type OffsetFunction = (param: OffsetFunctionParam) => [number | null | undefined, number | null | undefined];

export type Offset = OffsetFunction | [number | null | undefined, number | null | undefined];

export type OffsetModifier = ModifierProps<
  'offset',
  Partial<{
    offset: Offset;
  }>
>;

export type PreventOverflowModifier = ModifierProps<
  'preventOverflow',
  Partial<{
    mainAxis: boolean;
    altAxis: boolean;
    boundary: Boundary;
    rootBoundary: RootBoundary;
    altBoundary: boolean;
    /**
     * Allows the popper to overflow from its boundaries to keep it near its
     * reference element
     */
    tether: boolean;
    tetherOffset: (arg0: { popper: Rect; reference: Rect; placement: Placement }) => number;
    padding: Padding;
  }>
>;

export type PopperModifiers = (ArrowModifier | FlipModifier | OffsetModifier | PreventOverflowModifier)[];
export type PopperModifiersFn = (
  target: HTMLElement | VirtualElement,
  container: HTMLElement,
  arrow: HTMLElement | null,
) => PopperModifiers;

export type Position = 'above' | 'below' | 'before' | 'after';
export type Alignment = 'top' | 'bottom' | 'start' | 'end' | 'center';

export type AutoSize = 'height' | 'height-always' | 'width' | 'width-always' | 'always' | boolean;

export type PopperChildrenFn = (props: PopperChildrenProps) => React.ReactElement;

export type Boundary = PopperJsBoundary | 'scrollParent' | 'window';

export type PopperRefHandle = { updatePosition: () => void };

export interface PositioningProps {
  /**
   * Alignment for the component.
   */
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
   * and 'start' | 'end' respectively), then provided value for 'align' will be ignored and 'center' will be used instead.
   */
  position?: Position;

  /**
   * Enables the Popper box to position itself in 'fixed' mode (default value is position: 'absolute')
   * @default false
   */
  positionFixed?: boolean;

  /**
   * Lets you displace a popper element from its reference element.
   * This can be useful if you need to apply some margin between them or if you need to fine tune the
   * position according to some custom logic.
   */
  offset?: Offset;

  /**
   * When the reference element or the viewport is outside viewport allows a popper element to be fully in viewport.
   * "all" enables this behavior for all axis.
   */
  unstable_disableTether?: boolean | 'all';

  /**
   * Disables automatic repositioning of the component; it will always be placed according to the values of `align` and
   * `position` props, regardless of the size of the component, the reference element or the viewport.
   */
  unstable_pinned?: boolean;

  /**
   * Applies max-height and max-width on popper to fit it within the available space in viewport.
   * true enables this for both width and height when overflow happens. 'always' applies `max-height`/`max-width` regardless of overflow.
   * 'height' applies `max-height` when overflow happens, and 'width' for `max-width`
   * `height-always` applies `max-height` regardless of overflow, and 'width-always' for always applying `max-width`
   */
  autoSize?: AutoSize;
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
   * If false, delays Popper's creation.
   * @default true
   */
  enabled?: boolean;

  /**
   * List of modifiers used to modify the offsets before they are applied to the Popper box.
   * They provide most of the functionality of Popper.js.
   */
  modifiers?: PopperModifiers | PopperModifiersFn;

  /**
   * Array of conditions to be met in order to trigger a subsequent render to reposition the elements.
   */
  positioningDependencies?: React.DependencyList;

  /**
   * Ref object containing the target node (the element that we're using as reference for Popper box).
   */
  targetRef: React.RefObject<Element> | VirtualElement;

  /** Rtl attribute for the component. */
  rtl?: boolean;
}

export interface PopperChildrenProps {
  /**
   * Popper's placement.
   */
  placement: Placement;

  /**
   * Function that updates the position of the Popper box, computing the new offsets and applying the new style.
   */
  scheduleUpdate(): void;
}

export type PopperShorthandProps = PositioningProps;

export type PopperOptions = Omit<PopperProps, 'children' | 'targetRef'> & {
  onStateUpdate?: (state: Partial<State>) => void;
};

export type PopperInstance = Instance & { isFirstRun?: boolean };
