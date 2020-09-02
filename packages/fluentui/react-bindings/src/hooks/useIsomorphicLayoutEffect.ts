import * as React from 'react';

// useLayoutEffect() produces a warning with SSR rendering
// https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test' ? React.useLayoutEffect : React.useEffect;
