import type { Alignment, Offset, Position } from '@fluentui/react-positioning';
import type { FallbackInput } from '../fallback/computeFallbackPosition';
import { ABOVE, BELOW } from '../constants';
import { resolveOffset } from '../utils';

/**
 * Handles `offset` when it's a function, a number or an object are handled by CSS.
 */
export function applyFunctionOffset(input: FallbackInput, offset: Offset | undefined): void {
  if (typeof offset !== 'function') {
    return;
  }

  const [anchor, , width, height] = input;

  input[12] = ({ position, align }) => {
    const isBlockMain = position === ABOVE || position === BELOW;
    const alignment: Alignment = isBlockMain ? align : align === 'start' ? 'top' : align === 'end' ? 'bottom' : align;
    const [mainAxis, crossAxis] = resolveOffset(
      offset({
        positionedRect: { x: 0, y: 0, width, height },
        targetRect: { x: anchor.left, y: anchor.top, width: anchor.width, height: anchor.height },
        position: position as Position,
        alignment,
      }),
    );

    return isBlockMain ? [mainAxis, crossAxis] : [crossAxis, mainAxis];
  };
}
