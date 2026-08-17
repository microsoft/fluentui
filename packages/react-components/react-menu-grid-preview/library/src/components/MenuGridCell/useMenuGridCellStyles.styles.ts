import { clsx } from 'clsx';
import type { MenuGridCellState } from './MenuGridCell.types';

import styles from './MenuGridCell.module.css';

/**
 * Public identity class for MenuGridCell.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. `useValidateNesting` (this package's and react-menu's) reads it
 * with `classList.contains`, which takes a TOKEN and needs no escaping.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuGridCellClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuGridCellClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridCellClassNames: { root: string } = {
  root: 'group/fui-menu-grid-cell',
};

export const useMenuGridCellStyles_unstable = (state: MenuGridCellState): MenuGridCellState => {
  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module class, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // When MenuGridItem renders this component for one of its four cell slots, the string it
  // composed arrives as `state.root.className` and therefore lands AFTER these tokens —
  // exactly the order the Griffel version produced.
  state.root.className = clsx(
    styles.root,
    menuGridCellClassNames.root,
    state.visuallyHidden && styles['visually-hidden'],
    state.root.className,
  );

  return state;
};
