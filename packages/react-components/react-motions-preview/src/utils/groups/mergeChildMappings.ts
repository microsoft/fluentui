import type { PresenceGroupChildMapping } from './types';

/**
 * When you're adding or removing children some may be added or removed in the same render pass. We want to show *both*
 * since we want to simultaneously animate elements in and out. This function takes a previous set of keys and a new set
 * of keys and merges them with its best guess of the correct ordering.
 */
export function mergeChildMappings(
  prevMapping: PresenceGroupChildMapping,
  nextMapping: PresenceGroupChildMapping,
): PresenceGroupChildMapping {
  function getValueForKey(key: string) {
    return key in nextMapping ? nextMapping[key] : prevMapping[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  const nextKeysPending: Record<string, string[]> = {};
  let pendingKeys: string[] = [];

  // eslint-disable-next-line guard-for-in
  for (const prevKey in prevMapping) {
    if (prevKey in nextMapping) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }

      continue;
    }

    pendingKeys.push(prevKey);
  }

  const childMapping: PresenceGroupChildMapping = {};

  // eslint-disable-next-line guard-for-in
  for (const nextKey in nextMapping) {
    if (nextKeysPending[nextKey]) {
      for (const pendingNextKey of nextKeysPending[nextKey]) {
        childMapping[pendingNextKey] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (const pendingKey of pendingKeys) {
    childMapping[pendingKey] = getValueForKey(pendingKey);
  }

  return childMapping;
}
