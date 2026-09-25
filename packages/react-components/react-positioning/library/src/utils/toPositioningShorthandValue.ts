import type { Position, PositioningPlacement, PositioningShorthandValue } from '../types';
import { fromFloatingUIPlacement } from './fromFloatingUIPlacement';

const RTL_POSITION_SWAP: Partial<Record<Position, Position>> = { before: 'after', after: 'before' };

/**
 * Maps a physical Floating UI placement to the logical shorthand vocabulary (`above-start`,
 * `after-top`, ...). In RTL the horizontal sides are swapped so `before`/`after` stay logical.
 */
export function toPositioningShorthandValue(
  placement: PositioningPlacement,
  isRtl: boolean,
): PositioningShorthandValue {
  const { position: physicalPosition, alignment } = fromFloatingUIPlacement(placement);
  const position = (isRtl && RTL_POSITION_SWAP[physicalPosition]) || physicalPosition;

  if (!alignment || alignment === 'center') {
    return position;
  }

  return `${position}-${alignment}` as PositioningShorthandValue;
}
