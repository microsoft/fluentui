'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression — it
 * still calls `useButtonStyles_unstable`, so the rule agrees the directive is required, and
 * that same call is what keeps this function a HOOK in the react-compiler's eyes, hence the
 * retained `react-hooks/immutability` disable below (the state-mutation pattern is preserved
 * per DECISIONS.md D14). Converted hooks that call nothing carry a trailing
 * `eslint-disable-line` instead; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';

import type { HamburgerState } from './Hamburger.types';

import styles from './Hamburger.module.css';

/**
 * Hamburger's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<ButtonSlots>` to `{ root: string }` — the `icon`
 * key is gone (D16.5) — and the value is no longer the `fui-Hamburger` BEM static (D16.1).
 *
 * The rendered element carries TWO markers, this one and react-button's `group/fui-button`:
 * a Hamburger IS a Button (D16.3), and a descendant can address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + hamburgerClassNames.root` is invalid CSS.
 * Use `fuiSelector(hamburgerClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const hamburgerClassNames: { root: string } = {
  root: 'group/fui-hamburger',
};

/**
 * Apply styling to the Hamburger slots based on the state
 */
export const useHamburgerStyles_unstable = (state: HamburgerState): HamburgerState => {
  useButtonStyles_unstable(state);

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
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, 'group/fui-hamburger', state.root.className);

  // The `icon` slot's assignment is gone: its only library token was the
  // `fui-Hamburger__icon` static, so what remained after D16 would have been
  // `clsx(state.icon.className)` — an identity on the consumer's own string, i.e. dead code
  // implying this hook styles a slot it does not (CONVERSION_GUIDE, "a slot whose only
  // library token is the static"). `useButtonStyles_unstable` above already decorates it.

  return state;
};
