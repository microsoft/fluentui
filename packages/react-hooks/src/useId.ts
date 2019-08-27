import { getId } from '@uifabric/utilities';
import { useConst } from './useConst';

/**
 * Hook to generate a unique ID in the global scope (spanning across duplicate copies of the same library).
 *
 * @param prefix - Optional prefix for the ID
 * @returns The ID
 */
export function useId(prefix?: string): string {
  // The getId call is intentionally done within an initializer function (not directly) because
  // calling getId has the side effect of updating the global constant for the next ID value.
  // While this isn't likely to cause problems in practice, it's better to avoid the extra updates.
  return useConst(() => getId(prefix));
}
