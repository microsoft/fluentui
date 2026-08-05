'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Options for {@link useCssVarValue}.
 */
export interface UseCssVarValueOptions {
  /**
   * Value returned before the element is mounted (SSR and the first client render) and
   * whenever the variable has no computed value at the element (not defined, or the
   * element/ref is absent).
   */
  fallback?: string;
}

/**
 * Reads the computed value of a CSS custom property at the DOM position of `elementRef`.
 *
 * The read happens through `getComputedStyle(element).getPropertyValue(variableName)` at the
 * consuming element, so cascade, inheritance and theme-provider scoping all apply — the value
 * is whatever CSS would hand to a `var()` reference on that element.
 *
 * Staleness semantics: the variable is read ONCE, in a layout effect after the element
 * mounts (and again only if `variableName` changes). It is deliberately NOT reactive — later
 * stylesheet, class or theme changes that alter the variable do not update the returned
 * value. Callers that need a live value must remount or re-key the owner. This keeps the
 * hook free of per-render `getComputedStyle` calls and observers.
 *
 * SSR-safe: on the server (and until the layout effect runs) the hook returns
 * `options.fallback`.
 *
 * NOTE (jsdom): jsdom's `getComputedStyle` resolves custom properties set as inline styles,
 * but does not cascade them from stylesheets — in unit tests, set the variable via
 * `element.style.setProperty(...)`.
 *
 * @param variableName - the custom property to read, including the leading dashes
 *   (e.g. `'--base-scale'`).
 * @param elementRef - ref to the element at whose DOM position the variable is resolved.
 * @param options - see {@link UseCssVarValueOptions}.
 * @returns the computed value of the variable (trimmed), or `options.fallback` when
 *   unavailable.
 */
export function useCssVarValue(
  variableName: string,
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseCssVarValueOptions = {},
): string | undefined {
  const { fallback } = options;
  const [value, setValue] = React.useState<string | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    const targetWindow = element?.ownerDocument?.defaultView;

    if (!element || !targetWindow) {
      return;
    }

    const computed = targetWindow.getComputedStyle(element).getPropertyValue(variableName).trim();

    if (computed !== '') {
      setValue(computed);
    }
    // Read once per mount (per variableName) — see the staleness semantics above. The ref
    // object identity is stable; its `.current` is intentionally not a reactive input.
  }, [variableName, elementRef]);

  return value ?? fallback;
}
