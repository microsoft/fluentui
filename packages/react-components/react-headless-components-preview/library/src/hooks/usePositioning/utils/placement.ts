import type { Alignment, Position, PositioningShorthandValue } from '@fluentui/react-positioning';
import type { LogicalAlignment } from '../types';
import { ALIGNMENTS, POSITIONS, POSITION_AREA_MAP } from '../constants';
import { resolvePositioningShorthand } from './resolvePositioningShorthand';

const ALIGN_ALIASES: Record<string, LogicalAlignment> = {
  top: ALIGNMENTS.start,
  bottom: ALIGNMENTS.end,
};

export function normalizeAlign(raw: string): LogicalAlignment {
  if (raw === ALIGNMENTS.start || raw === ALIGNMENTS.center || raw === ALIGNMENTS.end) {
    return raw;
  }

  return ALIGN_ALIASES[raw] ?? ALIGNMENTS.center;
}

/**
 * Maps (position, align) into the placement value used for the `data-placement`
 * attribute. Center alignment renders as the bare position; horizontal positions
 * (`before`/`after`) render their alignment as physical (`top`/`bottom`) to
 * match react-positioning's convention.
 */
export function getPlacementString(position: Position, align: Alignment): PositioningShorthandValue {
  const logical = normalizeAlign(align);

  if (logical === ALIGNMENTS.center) {
    return position;
  }

  if (position === POSITIONS.before || position === POSITIONS.after) {
    return `${position}-${logical === ALIGNMENTS.start ? 'top' : 'bottom'}`;
  }

  return `${position}-${logical}`;
}

export function shorthandToPositionArea(shorthand: PositioningShorthandValue): string {
  const { position = POSITIONS.above, align = ALIGNMENTS.center } = resolvePositioningShorthand(shorthand);
  return POSITION_AREA_MAP[position][normalizeAlign(align)];
}

export function getCoverSelfAlignment(
  position: Position,
  align: LogicalAlignment,
): { alignSelf: string; justifySelf: string } {
  if (position === POSITIONS.above) {
    return { alignSelf: ALIGNMENTS.end, justifySelf: align };
  }

  if (position === POSITIONS.below) {
    return { alignSelf: ALIGNMENTS.start, justifySelf: align };
  }

  if (position === POSITIONS.before) {
    return { alignSelf: align, justifySelf: ALIGNMENTS.end };
  }

  return { alignSelf: align, justifySelf: ALIGNMENTS.start };
}
