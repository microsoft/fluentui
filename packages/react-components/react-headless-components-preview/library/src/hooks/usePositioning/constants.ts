import type { Position, Alignment } from './types';

export const FALLBACK_NAME_PREFIX = '--fluent-fallback-';

export const POSITIONS = {
  above: 'above',
  below: 'below',
  before: 'before',
  after: 'after',
};

export const ALIGNMENTS = {
  start: 'start',
  center: 'center',
  end: 'end',
};

export const FLIP_POSITION_MAP: Record<Position, Position> = {
  above: 'below',
  below: 'above',
  before: 'after',
  after: 'before',
};

export const POSITION_AREA_MAP: Record<Position, Record<Alignment, string>> = {
  above: {
    center: 'block-start center',
    start: 'block-start span-inline-end',
    end: 'block-start span-inline-start',
  },
  below: {
    center: 'block-end center',
    start: 'block-end span-inline-end',
    end: 'block-end span-inline-start',
  },
  before: {
    center: 'center inline-start',
    start: 'inline-start span-block-end',
    end: 'inline-start span-block-start',
  },
  after: {
    center: 'center inline-end',
    start: 'inline-end span-block-end',
    end: 'inline-end span-block-start',
  },
};
