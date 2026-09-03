import { useLocalHeavy } from './local-heavy';

export function useLocalTrigger(): { tag: 'heavy' } {
  return useLocalHeavy();
}
