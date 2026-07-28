'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { FluentProviderSlots, FluentProviderState } from './FluentProvider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './FluentProvider.module.css';

export const fluentProviderClassNames: SlotClassNames<FluentProviderSlots> = {
  root: 'fui-FluentProvider',
};

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState): FluentProviderState => {
  /*
   * The argument order is unchanged from the `mergeClasses()` call this replaces, and it
   * is load-bearing beyond the cascade (which `@layer fui.*` in FluentProvider.module.css
   * now decides):
   *
   * - `group/fui-fluent-provider` is the named group marker (DECISIONS.md D15): a literal,
   *   unhashed, GLOBAL token, first so it reads the same as every other converted hook.
   *   FluentProvider is a context boundary rather than a stateful component, so the marker
   *   is INERT until some module references it — it is included because a theme- or
   *   direction-scoped read (`@variant group-rtl/fui-fluent-provider { … }`) is the
   *   plausible future need and this is the only element that spans a whole theme scope.
   *   It is safe next to `themeClassName`: react-portal-compat's extraction regex is
   *   case-sensitive and looks for `fui-FluentProvider` + `\w+`, which the all-lowercase,
   *   slash-bearing marker cannot match.
   * - `state.themeClassName` is the runtime `fui-FluentProvider<useId>` class that hosts
   *   the 459 `--token` custom properties. It stays in the className string so that
   *   `useFluentProviderContextValues_unstable` can publish `root.className` verbatim to
   *   portals (applyStylesToPortals), and so that react-portal-compat can re-extract it
   *   with `RegExp('([^\\s]*fui-FluentProvider\\w+)', 'g')` for v8 interop.
   * - the consumer `className` stays last (conformance contract, DECISIONS.md D3).
   *
   * `useRenderer_unstable()` is no longer called here — it only ever existed to feed
   * Griffel's `useStyles()`. The renderer context itself is untouched: FluentProvider
   * still consumes it in useFluentProvider.ts for the theme <style> tag (nonce/SSR path).
   */
  state.root.className = clsx(
    'group/fui-fluent-provider',
    fluentProviderClassNames.root,
    state.themeClassName,
    styles.root,
    state.root.className,
  );

  return state;
};
