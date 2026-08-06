import { useB } from './b';

export function useA(): number {
  return useB() + 1;
}
