import { clsx } from 'clsx';
import type { FluentProviderState } from './FluentProvider.types';

import styles from './FluentProvider.module.css';

/**
 * FluentProvider's identity prefix — **not a rendered class**, and the one place in the
 * library where `<x>ClassNames.root` is not the group marker.
 *
 * ## What it is
 *
 * `'fui-FluentProvider'` was the seed from which the pre-2b RUNTIME theme class
 * `fui-FluentProvider<useId>` was minted (`useFluentProviderThemeStyleTag`, removed in
 * theming Phase 2b) and which `@fluentui/react-portal-compat` regex-extracted to re-apply
 * the theme to v8 portals (replaced by `FluentProviderThemeClassName.ts`). Both roles are
 * gone: themes are now static CSS classes (`fui-theme-web-light`, …) passed via the
 * `themeClassName` prop. The constant remains exported only so consumer code referencing
 * `fluentProviderClassNames.root` keeps compiling (DECISIONS.md D16.5).
 *
 * ## What it is NOT
 *
 * @deprecated as a selector — no rendered class matches it anymore (the bare BEM static
 * stopped rendering in D16.1; the `useId`-suffixed runtime class stopped existing in
 * theming Phase 2b). To select a FluentProvider root use its public identity class, the
 * named-group marker, via the escaping helper — `fuiSelector('group/fui-fluent-provider')`
 * from `@fluentui/react-utilities`.
 */
export const fluentProviderClassNames: { root: string } = {
  root: 'fui-FluentProvider',
};

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState): FluentProviderState => {
  /*
   * The bare `fui-FluentProvider` BEM static that used to lead this list was removed in
   * DECISIONS.md D16.1. Cascade priority is decided by `@layer fui.*` in
   * FluentProvider.module.css, not by argument order, but the order is still load-bearing:
   *
   * - `styles.root` is FIRST, which is what satisfies the D15.1 / D16.2 invariant here:
   *   the group marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on
   *   the `/` under jsdom). Pre-2b this slot was held by `state.themeClassName` — then the
   *   always-present runtime `fui-FluentProvider<useId>` class; since theming Phase 2b it
   *   is the RESOLVED theme class (`fui-theme-web-dark`, …) and MAY BE EMPTY (no
   *   `themeClassName` prop, nothing inherited — the `:root` web-light defaults apply), so
   *   `styles.root`, the only other unconditional token, leads instead.
   *
   * - `state.themeClassName` stays IN the string (when non-empty) so that
   *   `useFluentProviderContextValues_unstable` can publish `root.className` verbatim to
   *   portals (applyStylesToPortals) — the portal mount node then carries the theme class
   *   and its subtree resolves the themed custom properties.
   *
   * - `group/fui-fluent-provider` is the named group marker (DECISIONS.md D15) and, after
   *   D16.1, FluentProvider's sole public identity CLASS. FluentProvider is a context
   *   boundary rather than a stateful component, so the marker is INERT until some module
   *   references it — it is here because a theme- or direction-scoped read
   *   (`@variant group-rtl/fui-fluent-provider { … }`) is the plausible future need and
   *   this is the only element that spans a whole theme scope.
   *
   * - the consumer `className` stays last (conformance contract, DECISIONS.md D3).
   */
  state.root.className = clsx(styles.root, 'group/fui-fluent-provider', state.themeClassName, state.root.className);

  return state;
};
