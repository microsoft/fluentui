import { runHeavy } from 'heavy-runtime';

export type HeavyType = { tag: 'heavy' };

export function useHeavy(): HeavyType {
  return runHeavy();
}
