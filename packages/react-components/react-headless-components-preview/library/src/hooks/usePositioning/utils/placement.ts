import type {
  Position,
  LogicalAlignment,
  PositioningProps,
  PositioningShorthand,
  PositioningShorthandValue,
} from '../types';
import { ALIGNMENTS, POSITIONS, POSITION_AREA_MAP } from '../constants';

const POSITION_ALIASES: Record<string, Position> = {
  top: POSITIONS.above,
  bottom: POSITIONS.below,
  left: POSITIONS.before,
  right: POSITIONS.after,
};

const ALIGN_ALIASES: Record<string, LogicalAlignment> = {
  top: ALIGNMENTS.start,
  bottom: ALIGNMENTS.end,
};

export function normalizePosition(raw: string): Position {
  if (raw in POSITIONS) {
    return raw as Position;
  }

  return POSITION_ALIASES[raw] ?? POSITIONS.above;
}

export function normalizeAlign(raw: string): LogicalAlignment {
  if (raw === ALIGNMENTS.start || raw === ALIGNMENTS.center || raw === ALIGNMENTS.end) {
    return raw;
  }

  return ALIGN_ALIASES[raw] ?? ALIGNMENTS.center;
}

/**
 * Maps (position, align) into the human-readable placement string used for the
 * `data-placement` attribute. Center alignment renders as the bare position.
 */
export function getPlacementString(position: Position, align: LogicalAlignment): string {
  return align === ALIGNMENTS.center ? position : `${position}-${align}`;
}

/**
 * Normalizes a shorthand (string or object) into a full `PositioningProps`.
 * Strings like `'below-start'` become `{ position: 'below', align: 'start' }`;
 * objects pass through unchanged.
 *
 */
export function resolvePositioningShorthand(value: PositioningShorthand | undefined): PositioningProps {
  if (!value) {
    return {};
  }

  if (typeof value !== 'string') {
    return {
      ...value,
      position: value.position !== undefined ? normalizePosition(value.position) : undefined,
      align: value.align !== undefined ? normalizeAlign(value.align) : undefined,
    };
  }

  const dash = value.indexOf('-');

  if (dash === -1) {
    return { position: normalizePosition(value) };
  }

  return {
    position: normalizePosition(value.slice(0, dash)),
    align: normalizeAlign(value.slice(dash + 1)),
  };
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
