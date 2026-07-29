import { clsx } from 'clsx';

import type { DrawerFooterState } from './DrawerFooter.types';

import styles from './DrawerFooter.module.css';

/**
 * DrawerFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<DrawerFooterSlots>` to `{ root: string }`, and the
 * value is no longer the `fui-DrawerFooter` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + drawerFooterClassNames.root` is invalid CSS.
 * Use `fuiSelector(drawerFooterClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const drawerFooterClassNames: { root: string } = {
  root: 'group/fui-drawer-footer',
};

/**
 * Data attribute rendered on the root slot and matched by `:where([data-scroll-state=…])`
 * selectors in `DrawerFooter.module.css`.
 *
 * The name is taken from the in-repo headless preview, which stamps exactly this on ITS
 * DrawerFooter root (`react-headless-components-preview/library/src/components/Drawer/
 * DrawerFooter/useDrawerFooter.ts:14`), and it is in the 25-name vocabulary
 * (reports/headless-precedent.md).
 *
 * It replaces BOTH Griffel branches: `scrollState !== 'none'` (draw the separator) and
 * `['middle','top'].includes(scrollState)` (make it visible) are now two selectors over the
 * same attribute. No native selector can express "the DrawerBody is scrolled", which is the
 * bar D15.6 sets for adding a `data-*` attribute at all.
 *
 * Not optional: `scrollState` is `Required` on the state and defaults to `'none'` in
 * `drawerContext`, so it never needs the `flag || undefined` form.
 */
type DrawerFooterRootDataAttributes = {
  'data-scroll-state': DrawerFooterState['scrollState'];
};

/**
 * Apply styling to the DrawerFooter slots based on the state
 */
export const useDrawerFooterStyles_unstable = (state: DrawerFooterState): DrawerFooterState => {
  const root = state.root as DrawerFooterState['root'] & DrawerFooterRootDataAttributes;

  root['data-scroll-state'] = state.scrollState;

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerFooter` static held that position.
  //
  // The two separator slices carry no class of their own any more — they are
  // `data-scroll-state` selectors inside `.root` — so this call has no conditional argument.
  state.root.className = clsx(styles.root, 'group/fui-drawer-footer', state.root.className);

  return state;
};
