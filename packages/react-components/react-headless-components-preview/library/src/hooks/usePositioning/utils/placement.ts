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

const flipBlock = (position: Position, align: LogicalAlignment): { position: Position; align: LogicalAlignment } => {
  if (position === POSITIONS.above) {
    return { position: POSITIONS.below, align };
  }

  if (position === POSITIONS.below) {
    return { position: POSITIONS.above, align };
  }

  return {
    position,
    align: align === ALIGNMENTS.start ? ALIGNMENTS.end : align === ALIGNMENTS.end ? ALIGNMENTS.start : align,
  };
};

const flipInline = (position: Position, align: LogicalAlignment): { position: Position; align: LogicalAlignment } => {
  if (position === POSITIONS.before) {
    return { position: POSITIONS.after, align };
  }

  if (position === POSITIONS.after) {
    return { position: POSITIONS.before, align };
  }

  return {
    position,
    align: align === ALIGNMENTS.start ? ALIGNMENTS.end : align === ALIGNMENTS.end ? ALIGNMENTS.start : align,
  };
};

export function getDefaultFallbackPositions(position: Position, align: LogicalAlignment): PositioningShorthandValue[] {
  const primary = getPlacementString(position, align);
  const block = flipBlock(position, align);
  const inline = flipInline(position, align);
  const both = flipInline(block.position, block.align);
  const seen = new Set<PositioningShorthandValue>([primary]);

  return [block, inline, both]
    .map(candidate => getPlacementString(candidate.position, candidate.align))
    .filter(candidate => {
      if (seen.has(candidate)) {
        return false;
      }

      seen.add(candidate);
      return true;
    });
}

export function getLogicalPlacement(placement: string, dir: 'ltr' | 'rtl'): PositioningShorthandValue | undefined {
  const [side, alignment] = placement.split('-');
  let position: Position;

  if (side === 'top') {
    position = POSITIONS.above;
  } else if (side === 'bottom') {
    position = POSITIONS.below;
  } else if (side === 'left') {
    position = dir === 'rtl' ? POSITIONS.after : POSITIONS.before;
  } else if (side === 'right') {
    position = dir === 'rtl' ? POSITIONS.before : POSITIONS.after;
  } else {
    return undefined;
  }

  if (!alignment) {
    return position;
  }

  if (position === POSITIONS.before || position === POSITIONS.after) {
    return `${position}-${alignment === 'start' ? 'top' : 'bottom'}`;
  }

  return `${position}-${alignment === 'start' ? 'start' : 'end'}`;
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
