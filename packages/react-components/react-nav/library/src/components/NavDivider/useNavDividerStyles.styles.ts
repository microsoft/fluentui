'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useDividerStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary — and
 * that same call is what keeps this function a HOOK in the react-compiler's eyes. Converted
 * leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDividerStyles_unstable } from '@fluentui/react-divider';

import type { NavDividerState } from './NavDivider.types';

import styles from './NavDivider.module.css';

/**
 * NavDivider's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<DividerSlots>` to `{ root: string }` — the
 * `wrapper` key is gone (D16.5) — and the value is no longer the `fui-NavDivider` BEM static
 * (D16.1).
 *
 * The rendered element carries TWO markers, this one and react-divider's
 * `group/fui-divider`: a NavDivider IS a Divider (D16.3), and a descendant can address
 * whichever identity it means.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + navDividerClassNames.root` is invalid CSS.
 * Use `fuiSelector(navDividerClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const navDividerClassNames: { root: string } = {
  root: 'group/fui-nav-divider',
};

/**
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector, throwing a render-time
  // `AggregateError` (D15.1). Before D16 the `fui-NavDivider` static held that position.
  //
  // `useDividerStyles_unstable` runs after this and prepends its own `styles.root` +
  // `group/fui-divider`, so on the DOM element `classList[0]` is react-divider's module
  // class and this pair sits after it. Cascade priority comes from the `@layer` order
  // (NavDivider.module.css authors at `fui.components.l2`), not from string position.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, 'group/fui-nav-divider', state.root.className) },
  };

  // The `wrapper` slot's assignment is gone: its only library token was the
  // `fui-NavDivider__wrapper` static, so what remained after D16 would have been
  // `clsx(state.wrapper.className)` — an identity on the consumer's own string, i.e. dead
  // code implying this hook styles a slot it does not (CONVERSION_GUIDE, "a slot whose only
  // library token is the static").

  state = useDividerStyles_unstable(state);

  return state;
};
