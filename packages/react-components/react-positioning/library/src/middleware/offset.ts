import type { Middleware } from '../floating';
import { offset as baseOffset } from '../floating';
import type { PositioningOptions } from '../types';
import { getFloatingUIOffset } from '../utils/getFloatingUIOffset';

/**
 * Wraps floating UI offset middleware to transform offset value.
 */
export function offset(offsetValue: PositioningOptions['offset']): Middleware {
  const floatingUIOffset = getFloatingUIOffset(offsetValue);
  return baseOffset(floatingUIOffset);
}
