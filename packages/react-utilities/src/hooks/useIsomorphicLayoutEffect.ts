import * as React from 'react';
import { canUseDOM } from '../ssr/index';

/**
 * React currently throws a warning when using useLayoutEffect on the server. To get around it, we can conditionally
 * useEffect on the server (no-op) and useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also need affected components to render on
 * the server.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 */
// eslint-disable-next-line no-restricted-properties
export const useIsomorphicLayoutEffect: typeof React.useEffect = canUseDOM() ? React.useLayoutEffect : React.useEffect;
