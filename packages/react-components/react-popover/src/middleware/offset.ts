import { offset as baseOffset } from '@floating-ui/dom';
import type { FloatingUIOptions } from '../types';
import { getFloatingUIOffset } from '../utils/getFloatingUIOffset';

/**
 * Wraps floating UI offset middleware to to transform offset value
 */
export function offset(offsetValue: FloatingUIOptions['offset']) {
  const floatingUIOffset = getFloatingUIOffset(offsetValue);
  return baseOffset(floatingUIOffset);
}
