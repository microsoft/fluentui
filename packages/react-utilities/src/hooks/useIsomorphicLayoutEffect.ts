import * as React from 'react';

const isSSR =
  typeof window === 'undefined' || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent);

// useLayoutEffect() produces a warning with SSR rendering
// https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
export const useIsomorphicLayoutEffect = isSSR ? React.useEffect : React.useLayoutEffect;
