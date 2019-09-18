import * as React from 'react';
import { getId } from '@uifabric/utilities/lib/getId';

/**
 * Hook to generate a unique ID in the global scope (spanning across duplicate copies of the same library).
 *
 * @param prefix - Optional prefix for the ID
 * @returns The ID
 */
export function useId(prefix?: string): string {
  // getId should only be called once since it updates the global constant for the next ID value.
  // (While an extra update isn't likely to cause problems in practice, it's better to avoid it.)
  const ref = React.useRef<string>();
  if (!ref.current) {
    ref.current = getId(prefix);
  }
  return ref.current;
}
