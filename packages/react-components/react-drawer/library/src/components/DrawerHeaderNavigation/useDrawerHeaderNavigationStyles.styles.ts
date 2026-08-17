import { clsx } from 'clsx';

import type { DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

import styles from './DrawerHeaderNavigation.module.css';

/**
 * DrawerHeaderNavigation's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<DrawerHeaderNavigationSlots>` to `{ root: string }`,
 * and the value is no longer the `fui-DrawerHeaderNavigation` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + drawerHeaderNavigationClassNames.root` is
 * invalid CSS. Use `fuiSelector(drawerHeaderNavigationClassNames.root)` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const drawerHeaderNavigationClassNames: { root: string } = {
  root: 'group/fui-drawer-header-navigation',
};

/**
 * Apply styling to the DrawerHeaderNavigation slots based on the state
 */
export const useDrawerHeaderNavigationStyles_unstable = (
  state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerHeaderNavigation` static held that position.
  state.root.className = clsx(styles.root, drawerHeaderNavigationClassNames.root, state.root.className);

  return state;
};
