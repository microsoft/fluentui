import { offset as baseOffset, Middleware } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getFloatingUIOffset } from '../utils/getFloatingUIOffset';

/**
 * Wraps floating UI offset middleware to transform offset value.
 */
export function offset(offsetValue: PositioningOptions['offset']): Middleware {
  const floatingUIOffset = getFloatingUIOffset(offsetValue);
  return baseOffset(floatingUIOffset);
}
