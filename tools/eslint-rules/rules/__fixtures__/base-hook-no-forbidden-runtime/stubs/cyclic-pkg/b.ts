import { useA } from './a';

export function useB(): number {
  // Pretend lazy ref to break true cycle at runtime; the static graph is cyclic.
  return (useA as unknown as () => number).length;
}
