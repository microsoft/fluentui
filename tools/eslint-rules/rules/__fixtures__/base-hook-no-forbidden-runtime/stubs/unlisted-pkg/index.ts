import { runHeavy } from 'heavy-runtime';

export function useUnlisted(): { tag: 'heavy' } {
  return runHeavy();
}
