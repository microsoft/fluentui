import { clsx } from 'clsx';
import type { MenuGridItemState } from './MenuGridItem.types';

import styles from './MenuGridItem.module.css';

/**
 * Public identity class for MenuGridItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. `useValidateNesting` (this package's and react-menu's) reads it
 * with `classList.contains`, which takes a TOKEN and needs no escaping.
 *
 * The `icon` / `content` / `subText` / `firstSubAction` / `secondSubAction` keys were removed
 * with the BEM statics (DECISIONS.md D16.1 / D16.5): there is no public class-name handle on
 * component internals. Those slots are `MenuGridCell`s, so `group/fui-menu-grid-cell`
 * addresses them structurally; this hook styles them through hashed module classes it
 * composes onto the slot objects it owns (the D16.3 M2 mechanism).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuGridItemClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuGridItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridItemClassNames: { root: string } = {
  root: 'group/fui-menu-grid-item',
};

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  // Unconditional module class FIRST, then the named group marker, with the consumer
  // className last (DECISIONS.md D16.2). `styles.root` is the identity-only local minted in
  // MenuGridItem.module.css — this component's root has no declarations of its own, and the
  // marker must never be `classList[0]` because nwsapi's `:scope` polyfill throws on the `/`
  // under jsdom (DECISIONS.md D15.1). The BEM static that used to hold that position is gone
  // (DECISIONS.md D16.1).
  //
  // This root IS a MenuGridRow root: `useMenuGridRowStyles_unstable` runs afterwards and
  // PREPENDS its own module class + `group/fui-menu-grid-row` to this string, so the element
  // legitimately carries TWO markers. Both are declared to react-conformance through
  // `testOptions['has-group-marker'].markers` in MenuGridItem.test.tsx (D16.3).
  state.root.className = clsx(styles.root, menuGridItemClassNames.root, state.root.className);

  // The `subText` assignment that used to sit alongside these is GONE, together with its
  // `if (state.subText)` guard: that slot's only library token was the BEM static, so after
  // D16.1 it reduced to `clsx(state.subText.className)` — an identity on the consumer's own
  // string (CONVERSION_GUIDE, "known special cases").
  //
  // Each remaining slot is a `MenuGridCell`; this hook holds its slot object and composes a
  // hashed module class onto it, which `useMenuGridCellStyles_unstable` then prepends its own
  // classes ahead of. Altitude for all of them is `fui.components.l2` — see the module.
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  if (state.content) {
    state.content.className = clsx(styles.content, state.content.className);
  }

  if (state.firstSubAction) {
    state.firstSubAction.className = clsx(styles['first-sub-action'], state.firstSubAction.className);
  }

  if (state.secondSubAction) {
    state.secondSubAction.className = clsx(styles['second-sub-action'], state.secondSubAction.className);
  }

  return state;
};
