import { offset as baseOffset } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getFloatingUIOffset } from '../utils/getFloatingUIOffset';

/**
 * Wraps floating UI offset middleware to to transform offset value
 */
export function offset(offsetValue: PositioningOptions['offset']) {
  const floatingUIOffset = getFloatingUIOffset(offsetValue);
  return baseOffset(floatingUIOffset);
}
