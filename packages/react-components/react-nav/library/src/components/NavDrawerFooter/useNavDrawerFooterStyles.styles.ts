'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useDrawerFooterStyles_unstable`,
 * so `enforce-use-client` sees a hook call and never reports the directive as unnecessary —
 * and that same call is what keeps this function a HOOK in the react-compiler's eyes.
 * Converted leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';

import type { NavDrawerFooterState } from './NavDrawerFooter.types';

import styles from './NavDrawerFooter.module.css';

/**
 * NavDrawerFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<NavDrawerFooterSlots>` to `{ root: string }`, and
 * the value is no longer the `fui-NavDrawerFooter` BEM static (D16.1).
 *
 * The rendered element carries TWO markers, this one and react-drawer's
 * `group/fui-drawer-footer`: a NavDrawerFooter IS a DrawerFooter (D16.3), and a descendant
 * can address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + navDrawerFooterClassNames.root` is invalid
 * CSS. Use `fuiSelector(navDrawerFooterClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const navDrawerFooterClassNames: { root: string } = {
  root: 'group/fui-nav-drawer-footer',
};

/**
 * Apply styling to the NavDrawerFooter slots based on the state
 */
export const useNavDrawerFooterStyles_unstable = (state: NavDrawerFooterState): NavDrawerFooterState => {
  state = useDrawerFooterStyles_unstable(state);

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector, throwing a render-time
  // `AggregateError` (D15.1). Before D16 the `fui-NavDrawerFooter` static held that position.
  //
  // DrawerFooter's hook has already run, so its module class + `group/fui-drawer-footer` are
  // inside `state.root.className` and end up AFTER this pair. Cascade priority comes from
  // the `@layer` order (NavDrawerFooter.module.css authors at `fui.components.l2`), not from
  // string position.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, 'group/fui-nav-drawer-footer', state.root.className) },
  };

  return state;
};
