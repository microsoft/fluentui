import type { Offset } from '../types';
import type { MiddlewareArguments } from '@floating-ui/dom';
import { fromFloatingUIPlacement } from './fromFloatingUIPlacement';
/**
 * Type taken from Floating UI since they are not exported
 */
export type FloatingUIOffsetValue =
  | number
  | {
      /**
       * The axis that runs along the side of the floating element.
       * @default 0
       */
      mainAxis?: number;
      /**
       * The axis that runs along the alignment of the floating element.
       * @default 0
       */
      crossAxis?: number;
      /**
       * When set to a number, overrides the `crossAxis` value for aligned
       * (non-centered/base) placements and works logically. A positive number
       * will move the floating element in the direction of the opposite edge
       * to the one that is aligned, while a negative number the reverse.
       * @default null
       */
      alignmentAxis?: number | null;
    };

/**
 * Type taken from Floating UI since they are not exported
 */
export type FloatingUIOffsetFunction = (args: MiddlewareArguments) => FloatingUIOffsetValue;

/**
 * Shim to transform offset values from this library to Floating UI
 * @param rawOffset Offset from this library
 * @returns An offset value compatible with Floating UI
 */
export function getFloatingUIOffset(
  rawOffset: Offset | undefined,
): FloatingUIOffsetValue | FloatingUIOffsetFunction | undefined {
  if (!rawOffset) {
    return rawOffset;
  }

  if (typeof rawOffset === 'number' || typeof rawOffset === 'object') {
    return rawOffset;
  }

  return ({ rects: { floating, reference }, placement }) => {
    const { position, alignment } = fromFloatingUIPlacement(placement);
    return rawOffset({ positionedRect: floating, targetRect: reference, position, alignment });
  };
}
