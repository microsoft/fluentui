import { useA } from './a';

export function useB(): number {
  // Keep the static import cycle while avoiding direct execution recursion.
  return (useA as unknown as () => number).length;
}
