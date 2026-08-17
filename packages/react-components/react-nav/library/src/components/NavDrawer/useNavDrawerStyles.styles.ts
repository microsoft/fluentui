import { clsx } from 'clsx';

import type { NavDrawerState } from './NavDrawer.types';

import styles from './NavDrawer.module.css';

/**
 * NavDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The rendered element carries TWO markers, this one and react-drawer's
 * `group/fui-inline-drawer`: a NavDrawer IS an InlineDrawer (D16.3), and a descendant can
 * address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const navDrawerClassNames: { root: string } = {
  root: 'group/fui-nav-drawer',
};

/**
 * Apply styling to the NavDrawer slots based on the state
 */
export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  const { size } = state;

  // ARGUMENT ORDER — `styles.root`, marker, conditional module class, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the `fui-NavDrawer`
  // static held that position. `styles['default-width']` could not hold it — it is
  // conditional, and `clsx` drops a falsy argument entirely.
  //
  // This string is handed on to the InlineDrawer that renders the element, which prepends its
  // own `styles.root` + marker; cascade priority comes from the `@layer` order
  // (NavDrawer.module.css authors at `fui.components.l2`), not from string position.
  state.root.className = clsx(
    styles.root,
    navDrawerClassNames.root,
    !size && styles['default-width'],
    state.root.className,
  );

  return state;
};
