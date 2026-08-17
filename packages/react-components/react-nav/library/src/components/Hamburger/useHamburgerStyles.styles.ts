'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary — and
 * that same call is what keeps this function a HOOK in the react-compiler's eyes. Converted
 * leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';

import type { HamburgerState } from './Hamburger.types';

import styles from './Hamburger.module.css';

/**
 * Hamburger's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The rendered element carries TWO markers, this one and react-button's `group/fui-button`:
 * a Hamburger IS a Button (D16.3), and a descendant can address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const hamburgerClassNames: { root: string } = {
  root: 'group/fui-hamburger',
};

/**
 * Apply styling to the Hamburger slots based on the state
 */
export const useHamburgerStyles_unstable = (state: HamburgerState): HamburgerState => {
  state = useButtonStyles_unstable(state);

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector, throwing a render-time
  // `AggregateError` (D15.1). Before D16 the `fui-Hamburger` static held that position.
  //
  // Button's hook has already run, so its module classes + `group/fui-button` are inside
  // `state.root.className` and end up AFTER this pair. Cascade priority comes from the
  // `@layer` order (Hamburger.module.css authors at `fui.components.l2`), not from string
  // position.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, hamburgerClassNames.root, state.root.className) },
  };

  // The `icon` slot's assignment is gone: its only library token was the
  // `fui-Hamburger__icon` static, so what remained after D16 would have been
  // `clsx(state.icon.className)` — an identity on the consumer's own string, i.e. dead code
  // implying this hook styles a slot it does not (CONVERSION_GUIDE, "a slot whose only
  // library token is the static"). `useButtonStyles_unstable` above already decorates it.

  return state;
};
