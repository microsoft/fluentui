import { clsx } from 'clsx';
import type { FluentProviderState } from './FluentProvider.types';

import styles from './FluentProvider.module.css';

/**
 * FluentProvider's identity prefix — **not a rendered class**, and the one place in the
 * library where `<x>ClassNames.root` is not the group marker.
 *
 * ## What it is
 *
 * `'fui-FluentProvider'` is the seed from which the RUNTIME theme class
 * `fui-FluentProvider<useId>` is minted (`useFluentProviderThemeStyleTag.ts`). That runtime
 * class hosts every `--token` custom property, and `@fluentui/react-portal-compat` extracts
 * it back out of `themeClassName` with `RegExp('([^\\s]*fui-FluentProvider\\w+)', 'g')` to
 * re-apply the theme to v8 portals. Both uses are non-styling and both consume this constant
 * as a *prefix*, so it has to keep this exact value —
 * `migration/griffel-to-tailwind/reports/DECISIONS.md` D16.1 keeps
 * `fui-FluentProvider<useId>` rendered for precisely this reason, and §1c/§2.8/§5b of
 * `reports/statics-removal-design.md` retain this constant for precisely this reason.
 *
 * ## What it is NOT
 *
 * @deprecated as a selector. The bare `fui-FluentProvider` BEM static is no longer rendered
 * (D16.1), so `document.querySelector('.' + fluentProviderClassNames.root)` matches nothing.
 * To select a FluentProvider root use its public identity class, the named-group marker, via
 * the escaping helper — `fuiSelector('group/fui-fluent-provider')` from
 * `@fluentui/react-utilities` — or match the runtime theme class with
 * `[class*="fui-FluentProvider"]`.
 *
 * Note the regex above requires `\w+` AFTER the literal, so it never matched the bare static
 * in the first place: dropping the static from the rendered class string cannot affect
 * portal-compat.
 */
export const fluentProviderClassNames: { root: string } = {
  root: 'fui-FluentProvider',
};

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState): FluentProviderState => {
  /*
   * The bare `fui-FluentProvider` BEM static that used to lead this list was removed in
   * DECISIONS.md D16.1. Cascade priority is decided by `@layer fui.*` in
   * FluentProvider.module.css, not by argument order, but the order is still load-bearing
   * in two ways:
   *
   * - `state.themeClassName` is FIRST, which is what satisfies the D15.1 / D16.2 invariant
   *   here: the group marker must never be `classList[0]` (nwsapi's `:scope` polyfill
   *   throws on the `/` under jsdom). This is the one converted hook that does NOT lead
   *   with `styles.root` — statics-removal-design.md §2.8 specifies `themeClassName` in
   *   that position because it is the runtime `fui-FluentProvider<useId>` class, always
   *   present and always selector-safe.
   *
   *   HEADS UP: if a future change ever makes `themeClassName` optional or possibly empty,
   *   move `styles.root` to the front — it is the only other unconditional token, and
   *   leaving the marker at index 0 is a render-time throw under jsdom, invisible to VR.
   *
   * - `state.themeClassName` also has to stay IN the string (wherever it sits) so that
   *   `useFluentProviderContextValues_unstable` can publish `root.className` verbatim to
   *   portals (applyStylesToPortals), and so react-portal-compat can re-extract it with
   *   `RegExp('([^\\s]*fui-FluentProvider\\w+)', 'g')` for v8 interop.
   *
   * - `group/fui-fluent-provider` is the named group marker (DECISIONS.md D15) and, after
   *   D16.1, FluentProvider's sole public identity CLASS. FluentProvider is a context
   *   boundary rather than a stateful component, so the marker is INERT until some module
   *   references it — it is here because a theme- or direction-scoped read
   *   (`@variant group-rtl/fui-fluent-provider { … }`) is the plausible future need and
   *   this is the only element that spans a whole theme scope. It is safe next to
   *   `themeClassName`: portal-compat's regex is case-sensitive and requires `\w+` after
   *   `fui-FluentProvider`, which the all-lowercase, slash-bearing marker cannot match.
   *
   * - the consumer `className` stays last (conformance contract, DECISIONS.md D3).
   *
   * `useRenderer_unstable()` is no longer called here — it only ever existed to feed
   * Griffel's `useStyles()`. As of S-G (D20) the Griffel renderer context is gone from
   * this package entirely: the theme <style> tag's CSP nonce now comes from the
   * Fluent-owned `nonce` prop / StyleNonceContext (see StyleNonceContext.ts).
   */
  state.root.className = clsx(state.themeClassName, styles.root, 'group/fui-fluent-provider', state.root.className);

  return state;
};
