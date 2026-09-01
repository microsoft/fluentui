'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import { observeCssVarDocument, useCssVarScope, useRootCssVarVersion } from './cssVarInvalidation';

/**
 * Options for {@link useCssVarValue}.
 */
export interface UseCssVarValueOptions {
  /**
   * Value returned before the element is mounted (SSR and the first client render) and
   * whenever the variable has no computed value at the element (not defined, or the
   * element/ref is absent). For the record form it fills each unresolved slot.
   */
  fallback?: string;

  /**
   * Reads the DOM on every committed render instead of consulting the cache.
   *
   * The read still WRITES the cache at the current scope and root versions, so a forced
   * consumer refreshes the shared `(element, variable)` entry for every other consumer of the
   * same pair — a plain peer's value can therefore move without any invalidation event. The
   * value is genuinely read at the current versions, so it is fresher, never wronger.
   */
  forceOnRender?: boolean;
}

/** The record form's return: the input's keys, each carrying its resolved value. */
export type CssVarValues<T extends Record<string, string>> = { [K in keyof T]: string | undefined };

type CacheEntry = {
  value: string | undefined;
  scopeId: object;
  scopeVersion: number;
  scopeSignature: string;
  rootVersion: number;
};

/**
 * Module-level memo of resolved values, keyed by (element, variable). `getComputedStyle` is the
 * dominant cost of this hook, and the tag records exactly what the value was read under, so a
 * hit is only taken while every one of those inputs is unchanged. Entries live as long as the
 * element (WeakMap).
 *
 * The cache is keyed per variable, not per call, so a record read is N independent entries and
 * shares them with any single-name read of the same variable at the same element.
 */
const cssVarValueCache = new WeakMap<HTMLElement, Map<string, CacheEntry>>();

/** The state key the single-name form stores its one value under. */
const SINGLE_KEY = '';

const EMPTY_VALUES: Record<string, string | undefined> = {};

function readCssVar(targetWindow: Window, element: HTMLElement, variableName: string): string | undefined {
  const computed = targetWindow.getComputedStyle(element).getPropertyValue(variableName).trim();

  return computed === '' ? undefined : computed;
}

/**
 * Reads the computed value of one or more CSS custom properties at the DOM position of
 * `elementRef`, and re-reads them when the values could have changed.
 *
 * The read happens through `getComputedStyle(element).getPropertyValue(name)` at the consuming
 * element, so cascade, inheritance and theme scoping all apply — the value is whatever CSS
 * would hand to a `var()` reference on that element.
 *
 * ## What re-reads
 *
 * - the nearest `FluentProvider`'s `className` or inline `style` changing, whether from a prop
 *   (applied in the same commit) or from an external `classList`/`style` mutation;
 * - any ANCESTOR provider changing — a nested provider only shields its subtree for tokens it
 *   redeclares itself, and a nested provider with no theme redeclares nothing, so an ancestor
 *   change must reach descendants. A nested provider's own change costs ancestors nothing;
 * - a `style` mutation on `documentElement` in any observed document;
 * - `invalidateCssVars()`, the imperative escape hatch;
 * - `options.forceOnRender`, on every committed render.
 *
 * A provider `className`/`style` change that arrives as a PROP costs two reads per consumer
 * rather than one: the render-time half invalidates in the commit that applies the attribute,
 * and the observer reports that same DOM write one microtask later, so the second read returns
 * what the first already had. The two paths cannot be told apart at the observer — an external
 * mutation is indistinguishable from React's own write — and the redundant read is the safe
 * direction, since suppressing it would risk missing a real change. An external
 * `classList`/`style` mutation, which only the observer can see, costs one read.
 *
 * ## What the returned strings look like
 *
 * The theme deliberately leaves its knobs unregistered (no `@property`), so a custom property's
 * computed value is the specified token stream with `var()` substituted and `calc()` NOT
 * evaluated. Measured over all 472 declared tokens:
 *
 * | Family | Literal | calc-string |
 * | --- | --- | --- |
 * | `--color-*` | 366 | 0 |
 * | `--shadow-*` | 12 | 0 |
 * | `--radius-*` | 11 | 0 |
 * | `--leading-*` | 5 | 5 |
 * | `--ease-*` | 9 | 0 |
 * | `--duration-*` | 8 | 0 |
 * | `--font-*` | 7 | 0 |
 * | `--spacing-*` | 2 | 25 |
 * | `--text-*` | 0 | 17 |
 * | `--stroke-*` | 0 | 4 |
 * | `--base-scale` | 0 | 1 |
 * | **Total** | **420** | **52** |
 *
 * So colour, shadow, radius, ease, duration and font read as usable values
 * (`#242424`, `150ms`, `12px`, `cubic-bezier(0.9, 0.1, 1, 0.2)`), while text, spacing, stroke
 * and base-scale read as unevaluated `calc()` strings (`calc(14px * calc(1rem / 16px))`) that
 * are invariant under both a theme change and a root font-size change. Leading splits down the
 * middle of the ramp's arithmetic: the finite ratios read as unitless numbers (`1.4`) and the
 * repeating ones as unevaluated division strings (`calc(20 / 14)`) — either way a RATIO, never
 * a length; a length is `calc(var(--text-base-300) * var(--leading-base-300))`. A theme-class change
 * moves 315 tokens and every one of them is a literal, so for exactly the tokens theme
 * switching changes, the value is real and scope-correct.
 *
 * A bare root `font-size` change (a zoom control) therefore moves nothing an unregistered token
 * can report; the invalidation still fires and the re-read returns the same string. A zoom
 * control that sets a custom property inline IS observable.
 *
 * ## Shape and identity
 *
 * A single name returns a single value; a record of names returns a record with the same keys.
 * The returned RECORD is a value, not a stable identity — it is a fresh object on every render
 * even when no slot changed, so it must not be used as an effect dependency. Read the slots.
 *
 * ## Residual staleness
 *
 * A provider's version only advances while that provider is mounted. A mutation at an element
 * while no provider is mounted to observe it, followed by a remount at the same element, can
 * serve a stale cached value. The root version covers the document-level case and
 * `invalidateCssVars()` is the escape hatch.
 *
 * SSR-safe: on the server (and until the layout effect runs) the hook returns
 * `options.fallback`.
 *
 * NOTE (jsdom): jsdom's `getComputedStyle` resolves custom properties set as inline styles, but
 * does not cascade them from stylesheets — in unit tests, set the variable via
 * `element.style.setProperty(...)`.
 *
 * @param variableName - the custom property to read including its leading dashes
 *   (e.g. `'--base-scale'`). The record overload takes a flat record of such names instead.
 * @param elementRef - ref to the element at whose DOM position the variables are resolved.
 * @param options - see {@link UseCssVarValueOptions}.
 * @returns the trimmed computed value; `fallback` fills it when the variable is unresolved. The
 *   record overload returns a record mirroring the input's keys.
 */
export function useCssVarValue(
  variableName: string,
  elementRef: React.RefObject<HTMLElement | null>,
  options?: UseCssVarValueOptions,
): string | undefined;
/**
 * Record form — the return mirrors the input's keys. See the single-name overload for the
 * full semantics.
 *
 * The hook is spelled as two overloads rather than one conditional return type because a
 * conditional stays DEFERRED inside a generic body, where it is not indexable; the overloads
 * resolve eagerly, so a generic wrapper over the record form needs no assertion.
 */
export function useCssVarValue<T extends Record<string, string>>(
  variableNames: T,
  elementRef: React.RefObject<HTMLElement | null>,
  options?: UseCssVarValueOptions,
): CssVarValues<T>;
export function useCssVarValue(
  variables: string | Record<string, string>,
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseCssVarValueOptions = {},
): string | undefined | Record<string, string | undefined> {
  const { fallback, forceOnRender } = options;
  const scope = useCssVarScope();
  const rootVersion = useRootCssVarVersion();
  const [values, setValues] = React.useState<Record<string, string | undefined>>(EMPTY_VALUES);

  const isSingle = typeof variables === 'string';
  const names: Record<string, string> = isSingle ? { [SINGLE_KEY]: variables } : variables;

  // Registers the consumer's own document with the root store, so a zoom control mutating that
  // document's root style reaches this consumer. Refcounted, so it costs one observer per
  // document however many consumers live in it.
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    return observeCssVarDocument(element.ownerDocument);
  }, [elementRef]);

  // No dependency array: the version-tagged cache entry is the sole gate on whether the DOM is
  // read, so the effect body is a Map lookup and an early return on a render that changed
  // nothing. This is also why an inline record literal needs no identity stabilisation — the
  // object is not a dependency of anything.
  //
  // The rule's hazard here is real and is closed deliberately: `options.forceOnRender` (R2) is
  // DEFINED as a read per committed render, which no dependency list can express, and the
  // infinite chain it warns about is cut by the per-slot equality bailout below (pinned by the
  // record-settles test).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    const targetWindow = element?.ownerDocument?.defaultView;

    if (!element || !targetWindow) {
      return;
    }

    let elementCache = cssVarValueCache.get(element);
    const next: Record<string, string | undefined> = {};
    const keys = Object.keys(names);

    for (const key of keys) {
      const variableName = names[key];
      const entry = elementCache?.get(variableName);
      const isFresh =
        entry !== undefined &&
        entry.scopeId === scope.id &&
        entry.scopeVersion === scope.version &&
        entry.scopeSignature === scope.signature &&
        entry.rootVersion === rootVersion;

      if (!forceOnRender && isFresh) {
        next[key] = entry.value;
        continue;
      }

      const value = readCssVar(targetWindow, element, variableName);

      if (!elementCache) {
        elementCache = new Map();
        cssVarValueCache.set(element, elementCache);
      }

      elementCache.set(variableName, {
        value,
        scopeId: scope.id,
        scopeVersion: scope.version,
        scopeSignature: scope.signature,
        rootVersion,
      });
      next[key] = value;
    }

    // Per-slot equality bailout. The record form returns a fresh object every render, which is
    // never Object.is-equal, so setting it unconditionally re-renders, re-runs this effect and
    // re-sets forever.
    setValues(previous =>
      keys.length === Object.keys(previous).length && keys.every(key => previous[key] === next[key]) ? previous : next,
    );
  });

  if (isSingle) {
    return values[SINGLE_KEY] ?? fallback;
  }

  const result: Record<string, string | undefined> = {};

  for (const key of Object.keys(names)) {
    result[key] = values[key] ?? fallback;
  }

  return result;
}
