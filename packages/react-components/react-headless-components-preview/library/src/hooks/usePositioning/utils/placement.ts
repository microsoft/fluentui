import type { Alignment, Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import type { LogicalAlignment } from '../types';
import { ABOVE, AFTER, BEFORE, BELOW, CENTER, END, START } from '../constants';
import { resolvePositioningShorthand } from '../resolvePositioningShorthand';

export function normalizeAlign(raw: string): LogicalAlignment {
  if (raw === START || raw === CENTER || raw === END) {
    return raw;
  }

  return raw === 'top' ? START : raw === 'bottom' ? END : CENTER;
}

/**
 * Maps (position, align) into the placement value used for the `data-placement`
 * attribute. Center alignment renders as the bare position; horizontal positions
 * (`before`/`after`) render their alignment as physical (`top`/`bottom`) to
 * match react-positioning's convention.
 */
export function getPlacementString(position: Position, align: Alignment): PositioningShorthandValue {
  const logical = normalizeAlign(align);

  if (logical === CENTER) {
    return position;
  }

  if (position === BEFORE || position === AFTER) {
    return `${position}-${logical === START ? 'top' : 'bottom'}`;
  }

  return `${position}-${logical}`;
}

export function shorthandToPositionArea(shorthand: PositioningShorthandValue): string {
  const { position = ABOVE, align = CENTER } = resolvePositioningShorthand(shorthand);
  return getPositionArea(position, normalizeAlign(align));
}

export function getPositionArea(position: Position, align: LogicalAlignment): string {
  const block = position === ABOVE || position === BELOW;
  const area = `${block ? 'block' : 'inline'}-${position === ABOVE || position === BEFORE ? 'start' : 'end'}`;

  return align === CENTER ? area : `${area} span-${block ? 'inline' : 'block'}-${align === START ? 'end' : 'start'}`;
}
