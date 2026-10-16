import type { Placement } from '../floating';
import type { Alignment, Position } from '../types';

const positions = {
  top: 'above',
  bottom: 'below',
  right: 'after',
  left: 'before',
} as const;

/**
 * Maps Floating UI placement to positioning values
 * @see positioningHelper.test.ts for expected placement values
 */
export const fromFloatingUIPlacement = (placement: Placement): { position: Position; alignment?: Alignment } => {
  const [side, floatingUIAlignment] = placement.split('-') as [keyof typeof positions, 'start' | 'end' | undefined];
  const position = positions[side];
  const positionedVertically = position === 'above' || position === 'below';

  // Floating UI automatically flips alignment
  // https://github.com/floating-ui/floating-ui/issues/1563
  const alignment: Alignment | undefined = floatingUIAlignment
    ? positionedVertically
      ? floatingUIAlignment
      : floatingUIAlignment === 'start'
      ? 'top'
      : 'bottom'
    : undefined;

  return { position, alignment };
};
