import type { MiddlewareState } from '@floating-ui/dom';
import type { Offset } from '../types';
import { fromFloatingUIPlacement } from './fromFloatingUIPlacement';

export type FloatingUIOffsetValue =
  | number
  | {
      mainAxis?: number;
      crossAxis?: number;
      alignmentAxis?: number | null;
    };

export type FloatingUIOffsetFunction = (args: MiddlewareState) => FloatingUIOffsetValue;

export function getFloatingUIOffset(
  rawOffset: Offset | undefined,
): FloatingUIOffsetValue | FloatingUIOffsetFunction | undefined {
  if (!rawOffset || typeof rawOffset === 'number' || typeof rawOffset === 'object') {
    return rawOffset;
  }

  return ({ rects: { floating, reference }, placement }) => {
    const { position, alignment } = fromFloatingUIPlacement(placement);
    return rawOffset({ positionedRect: floating, targetRect: reference, position, alignment });
  };
}
