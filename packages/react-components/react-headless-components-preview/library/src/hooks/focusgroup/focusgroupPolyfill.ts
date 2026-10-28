'use client';

import * as React from 'react';
// @ts-expect-error -- the Shadow DOM free build is only reachable through package `exports`, which this package's
// `moduleResolution` can't resolve; it shares the main entry's API.
import * as focusgroupPolyfill from '@microsoft/focusgroup-polyfill/shadowless';

const { polyfill, supportsFocusGroup } = focusgroupPolyfill as typeof import('@microsoft/focusgroup-polyfill');

/**
 * Returns `true` when the browser implements the `focusgroup` HTML attribute natively.
 */
export const supportsFocusgroup = (): boolean => supportsFocusGroup();

/**
 * Returns a ref that applies `@microsoft/focusgroup-polyfill` to the referenced element and its `[focusgroup]`
 * descendants, in browsers without native `focusgroup` support. Only the elements a component renders are
 * polyfilled; the rest of the page is left alone.
 *
 * Pass the element's `focusgroup` value so the ref re-applies the polyfill when the attribute is added later.
 *
 * TODO: switch to a scoped `connect()` that returns a disposer once the polyfill provides one
 * (https://github.com/microsoft/polyfills/issues/79), so groups are torn down on unmount.
 */
export const useFocusgroupPolyfill = (focusgroup?: string): React.RefCallback<HTMLElement> =>
  React.useCallback(
    (element: HTMLElement | null) => {
      if (element && focusgroup) {
        polyfill(element);
      }
    },
    [focusgroup],
  );
