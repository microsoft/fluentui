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

  /**
   * Explicit re-read trigger. Compared like an effect dependency list (`Object.is` per
   * entry): when any entry changes, the variable is re-read from the DOM and the
   * `(element, variable)` cache entry is refreshed. Omit it for the default
   * read-once-per-(element, variable) behavior.
   *
   * Typical use: pass the value that scopes the variable — e.g. the active theme class —
   * so a theme switch triggers exactly one re-read:
   * `useCssVarValue('--color-neutral-background-1', ref, { deps: [themeClassName] })`.
   *
   * Providing `deps` also opts the instance out of the cross-mount cache on its FIRST
   * read (the DOM is read fresh on every mount) — the cache cannot know which deps a
   * cached value was read under, and a stale hit after a theme change while unmounted
   * would be wrong.
   */
  deps?: React.DependencyList;
}

/**
 * Module-level memo of resolved values, keyed by (element, variable). Repeated mounts
 * reading the same variable at the same element skip the `getComputedStyle` call — the
 * dominant cost of this hook. Entries live as long as the element (WeakMap) and are only
 * refreshed by a `deps` change (see {@link UseCssVarValueOptions.deps}).
 */
const cssVarValueCache = new WeakMap<HTMLElement, Map<string, string>>();

function areDepsEqual(a: React.DependencyList | undefined, b: React.DependencyList | undefined): boolean {
  if (a === undefined || b === undefined) {
    return a === b;
  }

  return a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
}

/**
 * Reads the computed value of a CSS custom property at the DOM position of `elementRef`.
 *
 * The read happens through `getComputedStyle(element).getPropertyValue(variableName)` at the
 * consuming element, so cascade, inheritance and theme scoping (theme classes — theming
 * Phase 2b) all apply — the value is whatever CSS would hand to a `var()` reference on that
 * element.
 *
 * Staleness semantics: the variable is read ONCE per (element, variable) — in a layout
 * effect after the element mounts — and the result is memoized module-wide, so later
 * mounts at the same element reuse it without touching the DOM. It is deliberately NOT
 * reactive: stylesheet, class or theme changes that alter the variable do NOT update the
 * returned value (no per-render reads, no observers). Callers that need a re-read have
 * exactly one trigger: change an entry of `options.deps` (e.g. pass the active theme
 * class), which re-reads the DOM and refreshes the cache entry.
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
  const { fallback, deps } = options;
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const previousDepsRef = React.useRef<React.DependencyList | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    const targetWindow = element?.ownerDocument?.defaultView;

    if (!element || !targetWindow) {
      return;
    }

    const depsChanged = !areDepsEqual(previousDepsRef.current, deps);
    previousDepsRef.current = deps;

    let elementCache = cssVarValueCache.get(element);
    const cached = depsChanged ? undefined : elementCache?.get(variableName);

    if (cached !== undefined) {
      setValue(cached);
      return;
    }

    const computed = targetWindow.getComputedStyle(element).getPropertyValue(variableName).trim();

    if (computed !== '') {
      if (!elementCache) {
        elementCache = new Map();
        cssVarValueCache.set(element, elementCache);
      }
      elementCache.set(variableName, computed);
      setValue(computed);
    } else {
      // The variable does not resolve (anymore) — drop any stale memo and fall back.
      elementCache?.delete(variableName);
      setValue(undefined);
    }
    // Read once per (element, variableName), re-read only on a `deps` change — see the
    // staleness semantics above. The ref object identity is stable; its `.current` is
    // intentionally not a reactive input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variableName, elementRef, ...(deps ?? [])]);

  return value ?? fallback;
}
