import { mergeChildMappings } from './mergeChildMappings';
import type { PresenceGroupChildMapping } from './types';

export function getNextChildMapping(
  prevChildMapping: PresenceGroupChildMapping,
  nextChildMapping: PresenceGroupChildMapping,
) {
  const childrenMapping = mergeChildMappings(prevChildMapping, nextChildMapping);

  Object.entries(childrenMapping).forEach(([key, childDefinition]) => {
    const hasPrev = key in prevChildMapping;
    const hasNext = key in nextChildMapping;

    if (hasNext) {
      // Case 1: item hasn't changed transition states
      if (hasPrev) {
        childrenMapping[key] = { ...childDefinition };
        return;
      }

      // Case 2: item is new (entering)
      childrenMapping[key] = {
        ...childDefinition,
        appear: true,
        visible: true,
      };
      return;
    }

    // Case 3: item is leaving
    childrenMapping[key] = {
      ...childDefinition,
      visible: false,
    };
  });

  return childrenMapping;
}
