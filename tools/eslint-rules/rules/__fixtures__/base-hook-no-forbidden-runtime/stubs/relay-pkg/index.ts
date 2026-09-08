import { useBenign } from 'wrapper-pkg';

// Mirrors `useActiveDescendant`: an intermediate package that consumes only the benign export of
// the wrapper package.
export function useRelay(): void {
  useBenign();
}
