import { runHeavy } from 'heavy-runtime';

export function useDirtyExport(): { tag: 'heavy' } {
  return runHeavy();
}
