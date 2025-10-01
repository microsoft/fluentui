import type { Alignment, Offset, OffsetObject, Position } from '../../types';

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

const positionAreaLookup = {
  'above-center': 'block-start span-all',
  'above-start': 'block-start span-inline-end',
  'above-end': 'block-start span-inline-start',
  'below-center': 'block-end span-all',
  'below-start': 'block-end span-inline-end',
  'below-end': 'block-end span-inline-start',
  'before-center': 'center inline-start',
  'before-top': 'span-block-end inline-start',
  'before-bottom': 'span-block-start inline-start',
  'after-center': 'center inline-end',
  'after-top': 'span-block-end inline-end',
  'after-bottom': 'span-block-start inline-end',
};

const marginLookup = {
  above: 'marginBlockEnd',
  below: 'marginBlockStart',
  before: 'marginInlineEnd',
  after: 'marginInlineStart',
};

const crossMarginLookup = {
  above: 'marginInlineStart',
  below: 'marginInlineStart',
  before: 'marginBlockStart',
  after: 'marginBlockStart',
};

function resolveOffset(offset: Offset, position: Position, alignment?: Alignment): OffsetObject {
  let res = offset;
  if (typeof res === 'function') {
    res = res({
      positionedRect: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      targetRect: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      position,
      alignment,
    });
  }
  if (typeof res === 'number') {
    return { mainAxis: res };
  }
  return res;
}

export const toPositionArea = (
  align: Alignment = 'center',
  position: Position = 'above',
  offset?: Offset,
): Record<string, string> => {
  const positionArea = `${position}-${align}`;

  const fallbacks = ['flip-block', 'flip-inline'];

  // If the alignment is center for either axis, the built in flip- strategies can't do anything
  if (align === 'center') {
    for (const val of Object.values(positionAreaLookup)) {
      fallbacks.push(val);
    }
  }

  const resolvedOffset = offset ? resolveOffset(offset, position, align) : { mainAxis: 0 };

  return {
    positionArea: positionAreaLookup[positionArea as keyof typeof positionAreaLookup],
    [marginLookup[position]]: `${resolvedOffset.mainAxis}px`,
    [crossMarginLookup[position]]: `${resolvedOffset.crossAxis ?? 0}px`,
    positionTry: fallbacks.join(','),
  };
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
