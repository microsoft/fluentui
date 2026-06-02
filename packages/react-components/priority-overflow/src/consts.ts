import type { OverflowEventPayload } from './types';

export const DATA_OVERFLOWING = 'data-overflowing';
export const DATA_OVERFLOW_GROUP = 'data-overflow-group';

/**
 * An empty, frozen overflow snapshot used as the default before anything has been measured.
 * @internal
 */
export const EMPTY_SNAPSHOT: OverflowEventPayload = Object.freeze({
  visibleItems: [],
  invisibleItems: [],
  groupVisibility: {},
});
