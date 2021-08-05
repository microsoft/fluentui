import * as React from 'react';
import { unstable_NormalPriority as NormalPriority, unstable_runWithPriority as runWithPriority } from 'scheduler';

const isSSR =
  typeof window === 'undefined' || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent);

export const useIsomorphicLayoutEffect = isSSR ? React.useEffect : React.useLayoutEffect;

export function runWithNormalPriority(thunk: () => void) {
  return runWithPriority(NormalPriority, thunk);
}
