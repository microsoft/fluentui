'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike most converted styles files, this one carries NO `enforce-use-client`
 * suppression. `useTreeItemLayoutStyles_unstable` still calls React hooks
 * (`useTreeContext_unstable`, `useTreeItemContext_unstable`) to read `size` / `appearance`
 * / `itemType`, so the rule agrees the directive is required and a suppression would be
 * flagged as an unused disable.
 */

import { clsx } from 'clsx';
import type { TreeItemLayoutSlots, TreeItemLayoutState } from './TreeItemLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

import styles from './TreeItemLayout.module.css';

export const treeItemLayoutClassNames: SlotClassNames<TreeItemLayoutSlots> = {
  root: 'fui-TreeItemLayout',
  iconBefore: 'fui-TreeItemLayout__iconBefore',
  main: 'fui-TreeItemLayout__main',
  iconAfter: 'fui-TreeItemLayout__iconAfter',
  expandIcon: 'fui-TreeItemLayout__expandIcon',
  aside: 'fui-TreeItemLayout__aside',
  actions: 'fui-TreeItemLayout__actions',
  selector: 'fui-TreeItemLayout__selector',
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
  const { main, iconAfter, iconBefore, expandIcon, root, aside, actions, selector } = state;

  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  const rootDataAttributes = root as typeof root & TreeItemLayoutRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability
  rootDataAttributes['data-size'] = size;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this TreeItemLayout's state, because
  // `styles.root` is hashed and unaddressable from outside this file. `data-size` is
  // already stamped on this very element above (DECISIONS.md D15, Tier 0 — no state mirrors
  // needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TreeItemLayout.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces (appearance → size → itemType, which
  // is NOT the order the slices are declared in).
  //
  // `styles.subtle` is intentionally absent from the module (the Griffel slice is `{}`);
  // clsx drops the resulting `undefined`, matching the empty class string Griffel produces.
  // eslint-disable-next-line react-hooks/immutability
  root.className = clsx(
    treeItemLayoutClassNames.root,
    'group/fui-tree-item-layout',
    styles.root,
    styles[appearance],
    styles[itemType],
    root.className,
  );

  // eslint-disable-next-line react-hooks/immutability
  main.className = clsx(treeItemLayoutClassNames.main, styles.main, main.className);

  if (expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    expandIcon.className = clsx(treeItemLayoutClassNames.expandIcon, styles['expand-icon'], expandIcon.className);
  }

  if (iconBefore) {
    // eslint-disable-next-line react-hooks/immutability
    iconBefore.className = clsx(
      treeItemLayoutClassNames.iconBefore,
      styles.icon,
      styles['icon-before'],
      iconBefore.className,
    );
  }

  if (iconAfter) {
    // eslint-disable-next-line react-hooks/immutability
    iconAfter.className = clsx(
      treeItemLayoutClassNames.iconAfter,
      styles.icon,
      styles['icon-after'],
      iconAfter.className,
    );
  }

  if (actions) {
    // eslint-disable-next-line react-hooks/immutability
    actions.className = clsx(treeItemLayoutClassNames.actions, styles.actions, actions.className);
  }
  if (aside) {
    // eslint-disable-next-line react-hooks/immutability
    aside.className = clsx(treeItemLayoutClassNames.aside, styles.aside, aside.className);
  }
  if (selector) {
    // eslint-disable-next-line react-hooks/immutability
    selector.className = clsx(treeItemLayoutClassNames.selector, selector.className);
  }

  return state;
};
