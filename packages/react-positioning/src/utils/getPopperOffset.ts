import type { Offset } from '../types';
import type { Rect, Placement } from '@popperjs/core';
import { fromPopperPlacement } from './fromPopperPlacement';
/**
 * Type taken from Popper since it is not exported
 */
export type PopperOffsetValue = [number | null | undefined, number | null | undefined];

/**
 * Type taken from Popper since it is not exported
 */
export type PopperOffset = PopperOffsetValue | PopperOffsetFunction;

/**
 * Type taken from Floating UI since it is not exported
 */
export type PopperOffsetFunctionParam = {
  popper: Rect;
  reference: Rect;
  placement: Placement;
};

/**
 * Type taken from Floating UI since it is not exported
 */
export type PopperOffsetFunction = (args: { popper: Rect; reference: Rect; placement: Placement }) => PopperOffsetValue;

/**
 * Shim to transform offset values from this library to Floating UI
 * @param rawOffset Offset from this library
 * @returns An offset value compatible with Floating UI
 */
export function getPopperOffset(rawOffset: Offset | undefined): PopperOffsetValue | PopperOffsetFunction | undefined {
  if (rawOffset === undefined) {
    return rawOffset;
  }

  if (typeof rawOffset === 'number') {
    return [0, rawOffset];
  }

  if (typeof rawOffset === 'object') {
    return [rawOffset.crossAxis, rawOffset.mainAxis];
  }

  return ({ popper, reference, placement }) => {
    const { position, alignment } = fromPopperPlacement(placement);
    const computedOffset = rawOffset({ positionedElement: popper, target: reference, position, alignment });
    if (typeof computedOffset === 'number') {
      return [0, computedOffset];
    }

    return [computedOffset.crossAxis, computedOffset.mainAxis];
  };
}
