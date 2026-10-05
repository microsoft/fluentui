import { runHeavy } from 'heavy-runtime';

export function useDeepInner(): { tag: 'heavy' } {
  return runHeavy();
}
