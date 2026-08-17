import { clsx } from 'clsx';
import type { TreeItemState } from './TreeItem.types';
import { treeItemLevelToken } from '../../utils/tokens';

import styles from './TreeItem.module.css';

/**
 * Public identity class for TreeItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + treeItemClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN but
 * terminates the name in selector position. Use `fuiSelector(treeItemClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const treeItemClassNames: { root: string } = {
  root: 'group/fui-tree-item',
};

type StaticLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type StaticLevelProperty = `level${StaticLevel}`;

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const { level } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    treeItemClassNames.root,
    isStaticallyDefinedLevel(level) && styles[`level${level}` as StaticLevelProperty],
    state.root.className,
  );

  // For levels beyond the statically generated classes (> 10), fall back to an
  // inline style that sets the indentation CSS variable dynamically. This avoids
  // generating an unbounded number of atomic classes while still supporting
  // arbitrarily deep trees. User-provided inline styles take precedence.
  if (!isStaticallyDefinedLevel(level)) {
    state.root.style = {
      [treeItemLevelToken]: level,
      ...state.root.style,
    };
  }

  return state;
};

function isStaticallyDefinedLevel(level: number): level is StaticLevel {
  return level >= 1 && level <= 10;
}
