import { useDeepInner } from './useDeepInner';

// Mirrors `useTabsterAttributes`: same wrapper package as `useBenign`, but its implementation
// reaches the forbidden runtime two hops down.
export function useDeep(): { tag: 'heavy' } {
  return useDeepInner();
}
