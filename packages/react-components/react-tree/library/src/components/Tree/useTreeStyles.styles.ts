import { clsx } from 'clsx';
import type { TreeState } from './Tree.types';

import styles from './Tree.module.css';

/**
 * Public identity class for Tree.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + treeClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN but
 * terminates the name in selector position. Use `fuiSelector(treeClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const treeClassNames: { root: string } = {
  root: 'group/fui-tree',
};

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  const isSubTree = state.level > 1;

  // Module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe class; before D16
  // the removed `fui-Tree` static was what held that position.
  //
  // The marker is a literal, unhashed, GLOBAL token and, since D16.1 retired the BEM
  // statics, Tree's SOLE public identity class: it is the only handle by which another
  // module — in this package or any other — can style an element from this Tree's state,
  // because `styles.root` is hashed and unaddressable from outside this file. Tree is the
  // outermost of the package's
  // four nested markers (Tree > TreeItem > TreeItemLayout / TreeItemPersonaLayout), so a
  // layout deep in the subtree can read `@variant group-rtl/fui-tree { … }` without Tree
  // exporting anything (DECISIONS.md D15, Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Tree.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The `react-hooks/immutability` suppression the Griffel version carried is gone: the
  // rule only fired because the assigned value derived from a hook call (`useBaseStyles()`),
  // and there are none left here. The state-mutation pattern itself is deliberately kept —
  // the mixed-mode sibling seam and the customStyleHooks contract depend on the shared
  // object, and its removal is a single Phase 3 sweep (DECISIONS.md D14).
  state.root.className = clsx(styles.root, treeClassNames.root, isSubTree && styles.subtree, state.root.className);
  return state;
};
