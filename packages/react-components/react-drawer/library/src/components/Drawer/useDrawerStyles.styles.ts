import { clsx } from 'clsx';

import type { DrawerState } from './Drawer.types';

import styles from './Drawer.module.css';

/**
 * Drawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<Omit<DrawerSlots, 'surfaceMotion'>>` to
 * `{ root: string }`, and the value is no longer the `fui-Drawer` BEM static (D16.1).
 *
 * `Drawer` renders an `InlineDrawer` or an `OverlayDrawer` as its root, so the rendered
 * element carries TWO markers: this one and the concrete drawer's. That is the D16.3 shape —
 * a Drawer IS an OverlayDrawer — and a descendant can address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + drawerClassNames.root` is invalid CSS. Use
 * `fuiSelector(drawerClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const drawerClassNames: { root: string } = {
  root: 'group/fui-drawer',
};

/**
 * Apply styling to the Drawer slots based on the state
 */
export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2).
  // `styles.root` is the identity-only local minted in Drawer.module.css: this hook declares
  // no styles at all, so without it the emitted string would start with `group/fui-drawer`,
  // and nwsapi's jsdom `:scope` polyfill builds its selector anchor from
  // `escape(element.classList[0])` — the `/` survives that escaping into an invalid selector
  // and every `:scope` query throws an `AggregateError` at render time (D15.1). Before D16
  // the `fui-Drawer` static held that position.
  //
  // `state.root.className` is passed on to the InlineDrawer / OverlayDrawer that renders it,
  // which prepends its own `styles.root` + marker — so on the DOM element this pair ends up
  // AFTER the concrete drawer's, and `classList[0]` is that component's module class.
  state.root.className = clsx(styles.root, 'group/fui-drawer', state.root.className);

  return state;
};
