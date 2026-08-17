import { useBenignRef } from './useBenignRef';

// Mirrors `useOnKeyboardNavigationChange`: lives in the wrapper package but bottoms out in a
// benign dependency, never in the forbidden runtime.
export function useBenign(): void {
  useBenignRef();
}
