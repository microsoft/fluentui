import * as React from 'react';
import { _isSSR } from './dom/setSSR';

// This hook must live in @fluentui/utilities because _isSSR is not exported

/**
 * React currently throws a warning when using `useLayoutEffect` on the server. To get around it,
 * this hook calls `useEffect` on the server (no-op) and `useLayoutEffect` in the browser.
 *
 * Prefer `useEffect` unless you have a specific need to do something after mount and before paint,
 * such as to avoid a render flash for certain operations.
 *
 * Server-side rendering is detected based on `setSSR` from `@fluentui/utilities`.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 */
// eslint-disable-next-line no-restricted-properties
export const useIsomorphicLayoutEffect: typeof React.useEffect = _isSSR ? React.useEffect : React.useLayoutEffect;
