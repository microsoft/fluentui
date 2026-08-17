import { clsx } from 'clsx';

import type { DrawerHeaderState } from './DrawerHeader.types';

import styles from './DrawerHeader.module.css';

/**
 * DrawerHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<DrawerHeaderSlots>` to `{ root: string }`, and the
 * value is no longer the `fui-DrawerHeader` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + drawerHeaderClassNames.root` is invalid CSS.
 * Use `fuiSelector(drawerHeaderClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const drawerHeaderClassNames: { root: string } = {
  root: 'group/fui-drawer-header',
};

/**
 * Data attribute rendered on the root slot and matched by `:where([data-scroll-state=…])`
 * selectors in `DrawerHeader.module.css`.
 *
 * The name is taken from the in-repo headless preview, which stamps exactly this on ITS
 * DrawerHeader root (`react-headless-components-preview/library/src/components/Drawer/
 * DrawerHeader/useDrawerHeader.ts:14`), and it is in the 25-name vocabulary
 * (reports/headless-precedent.md).
 *
 * It replaces BOTH Griffel branches: `scrollState !== 'none'` (draw the separator) and
 * `['middle','bottom'].includes(scrollState)` (make it visible) are now two selectors over
 * the same attribute. No native selector can express "the DrawerBody is scrolled", which is
 * the bar D15.6 sets for adding a `data-*` attribute at all.
 *
 * Not optional: `scrollState` is `Required` on the state and defaults to `'none'` in
 * `drawerContext`, so it never needs the `flag || undefined` form.
 */
type DrawerHeaderRootDataAttributes = {
  'data-scroll-state': DrawerHeaderState['scrollState'];
};

/**
 * Apply styling to the DrawerHeader slots based on the state
 */
export const useDrawerHeaderStyles_unstable = (state: DrawerHeaderState): DrawerHeaderState => {
  const root = state.root as DrawerHeaderState['root'] & DrawerHeaderRootDataAttributes;

  root['data-scroll-state'] = state.scrollState;

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerHeader` static held that position.
  //
  // The two separator slices carry no class of their own any more — they are
  // `data-scroll-state` selectors inside `.root` — so this call has no conditional argument.
  state.root.className = clsx(styles.root, drawerHeaderClassNames.root, state.root.className);

  return state;
};
