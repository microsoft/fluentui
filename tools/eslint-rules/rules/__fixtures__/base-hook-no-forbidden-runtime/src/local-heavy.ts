import { runHeavy } from 'heavy-runtime';

export type LocalHeavyType = { tag: 'local-heavy' };

export function useLocalHeavy(): { tag: 'heavy' } {
  return runHeavy();
}
