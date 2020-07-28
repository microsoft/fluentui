import * as React from 'react';

// useLayoutEffect that does not show warning when server-side rendering, see Alex Reardon's article for more info
// @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : /* istanbul ignore next */ React.useEffect;
