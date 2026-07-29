import { useB } from './b';
import { runHeavy } from 'heavy-runtime';

export function useA(): number {
  runHeavy();
  return useB() + 1;
}
