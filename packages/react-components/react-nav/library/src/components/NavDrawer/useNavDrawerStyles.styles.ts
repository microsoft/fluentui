import { clsx } from 'clsx';

import type { NavDrawerState } from './NavDrawer.types';

import styles from './NavDrawer.module.css';

/**
 * NavDrawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<Omit<InlineDrawerSlots, 'surfaceMotion'>>` to
 * `{ root: string }`, and the value is no longer the `fui-NavDrawer` BEM static (D16.1).
 *
 * The rendered element carries TWO markers, this one and react-drawer's
 * `group/fui-inline-drawer`: a NavDrawer IS an InlineDrawer (D16.3), and a descendant can
 * address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + navDrawerClassNames.root` is invalid CSS.
 * Use `fuiSelector(navDrawerClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
    'group/fui-nav-drawer',
    !size && styles['default-width'],
    state.root.className,
  );

  return state;
};
