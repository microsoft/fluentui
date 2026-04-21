import type { LogicalAlignment, Position } from './types';

export const GAP = 8;

export const POSITIONS = {
  above: 'above',
  below: 'below',
  before: 'before',
  after: 'after',
} as const;

export const ALIGNMENTS = {
  start: 'start',
  center: 'center',
  end: 'end',
} as const;

export const POSITION_AREA_MAP: Record<Position, Record<LogicalAlignment, string>> = {
  above: {
    center: 'block-start',
    start: 'block-start span-inline-end',
    end: 'block-start span-inline-start',
  },
  below: {
    center: 'block-end',
    start: 'block-end span-inline-end',
    end: 'block-end span-inline-start',
  },
  before: {
    center: 'inline-start',
    start: 'inline-start span-block-end',
    end: 'inline-start span-block-start',
  },
  after: {
    center: 'inline-end',
    start: 'inline-end span-block-end',
    end: 'inline-end span-block-start',
  },
};
