import type { Alignment, Position } from '../../types';

const shouldAlignToCenter = (p?: Position, a?: Alignment): boolean => {
  const positionedVertically = p === 'above' || p === 'below';
  const alignedVertically = a === 'top' || a === 'bottom';

  return (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically);
};

const POSITION_MAP: Record<Position, string> = {
  above: 'anchor(start)',
  below: 'anchor(end)',
  before: 'anchor(start)',
  after: 'anchor(end)',
};

const ALIGNMENT_MAP: Record<Alignment, string | undefined> = {
  start: 'anchor(start)',
  end: 'anchor(end)',
  top: 'anchor(start)',
  bottom: 'anchor(end)',
  center: undefined,
};
export const toAnchorInset = (align?: Alignment, position?: Position): Record<string, string> => {
  const alignment = shouldAlignToCenter(position, align) ? 'center' : align;

  const computedPosition = position && POSITION_MAP[position];
  const computedAlignment = alignment && ALIGNMENT_MAP[alignment];

  if (computedPosition && computedAlignment) {
    return {
      insetBlockStart: computedPosition,
      insetInlineStart: computedAlignment,
    };
  }

  if (!computedPosition) {
    return {
      insetBlockStart: 'anchor(end)',
      insetInlineStart: 'anchor(start)',
    };
  }

  return {
    insetInlineStart: computedPosition,
  };
};
