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

    const prevChild = prevChildMapping[key];
    const isLeaving = !prevChild?.visible ?? false;

    // item is new (entering)
    if (hasNext && (!hasPrev || isLeaving)) {
      childrenMapping[key] = {
        ...childDefinition,
        appear: true,
        visible: true,
      };
      return;
    }

    // item is old (exiting)
    if (!hasNext && hasPrev && !isLeaving) {
      childrenMapping[key] = {
        ...childDefinition,
        visible: false,
      };
      return;
    }

    if (hasNext && hasPrev) {
      // item hasn't changed transition states
      // copy over the last transition props;
      childrenMapping[key] = { ...childDefinition };
    }
  });

  return childrenMapping;
}
