import type { OverflowSnapshot } from './types';

export const DATA_OVERFLOWING = 'data-overflowing';
export const DATA_OVERFLOW_GROUP = 'data-overflow-group';

/**
 * An empty, frozen overflow snapshot used as the default before anything has been measured.
 * @internal
 */
export const EMPTY_SNAPSHOT: OverflowSnapshot = Object.freeze({
  itemVisibility: {},
  groupVisibility: {},
  invisibleItemCount: 0,
});
