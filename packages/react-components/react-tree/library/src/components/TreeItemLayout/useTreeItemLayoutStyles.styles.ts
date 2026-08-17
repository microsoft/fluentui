'use client';

/*
 * NOTE on the directive above:
 * `useTreeItemLayoutStyles_unstable` still calls React hooks (`useTreeContext_unstable`,
 * `useTreeItemContext_unstable`) to read `size` / `appearance` / `itemType`, so
 * `enforce-use-client` agrees the directive is required and it stays. Converted styles files
 * that call nothing carry no directive at all.
 */

import { clsx } from 'clsx';
import type { TreeItemLayoutState } from './TreeItemLayout.types';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

import styles from './TreeItemLayout.module.css';

/**
 * Public identity class for TreeItemLayout.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + treeItemLayoutClassNames.root` is an INVALID selector — `/` is legal in a class
 * TOKEN but terminates the name in selector position. Use
 * `fuiSelector(treeItemLayoutClassNames.root)` from `@fluentui/react-utilities`.
 */
export const treeItemLayoutClassNames: { root: string } = {
  root: 'group/fui-tree-item-layout',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Only `size` becomes an attribute. It is the one enum here with catalog variants
 * (`size-small` / `size-medium`), and it selects rules on THREE slots — the root's own
 * typography/min-height plus the `iconBefore` / `iconAfter` padding — so one stamp on the
 * root drives every descendant rule (the same approach as react-button's `data-size` →
 * `.root … & .icon`).
 *
 * `appearance` and `itemType` stay module classes (`styles[appearance]`,
 * `styles[itemType]`): neither has a shared variant, and a component package must not add
 * one. That is the line react-badge and react-button already drew — `styles[appearance]`
 * / `styles[shape]` as classes, `data-size` as an attribute.
 *
 * All three values come from context (TreeContext for `size`/`appearance`, TreeItemContext
 * for `itemType`), not from TreeItemLayout props, so `TreeItemLayout.types.ts` is
 * untouched — the cast below is local, as the cookbook requires.
 */
type TreeItemLayoutRootDataAttributes = {
  'data-size': 'small' | 'medium';
};

/**
 * Apply styling to the TreeItemLayout slots based on the state
 */
export const useTreeItemLayoutStyles_unstable = (state: TreeItemLayoutState): TreeItemLayoutState => {
  // `selector` is deliberately NOT destructured: this hook writes no class to that slot — see
  // the note at the end of the function (DECISIONS.md D16.1 / design §4d).
  const { main, iconAfter, iconBefore, expandIcon, root, aside, actions } = state;

  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  const rootDataAttributes: TreeItemLayoutRootDataAttributes = {
    'data-size': size,
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  const composed: Pick<TreeItemLayoutState, 'root' | 'main'> &
    Partial<Pick<TreeItemLayoutState, 'expandIcon' | 'iconBefore' | 'iconAfter' | 'actions' | 'aside'>> = {
    root: {
      ...root,
      ...rootDataAttributes,
      className: clsx(styles.root, treeItemLayoutClassNames.root, styles[appearance], styles[itemType], root.className),
    },
    main: { ...main, className: clsx(styles.main, main.className) },
  };

  if (expandIcon) {
    composed.expandIcon = { ...expandIcon, className: clsx(styles['expand-icon'], expandIcon.className) };
  }

  if (iconBefore) {
    composed.iconBefore = { ...iconBefore, className: clsx(styles.icon, styles['icon-before'], iconBefore.className) };
  }

  if (iconAfter) {
    composed.iconAfter = { ...iconAfter, className: clsx(styles.icon, styles['icon-after'], iconAfter.className) };
  }

  if (actions) {
    composed.actions = { ...actions, className: clsx(styles.actions, actions.className) };
  }
  if (aside) {
    composed.aside = { ...aside, className: clsx(styles.aside, aside.className) };
  }

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return { ...state, ...composed };
};
