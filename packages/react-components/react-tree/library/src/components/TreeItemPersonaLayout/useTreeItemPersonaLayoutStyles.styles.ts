'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike most converted styles files, this one carries NO `enforce-use-client`
 * suppression. `useTreeItemPersonaLayoutStyles_unstable` still calls React hooks
 * (`useTreeContext_unstable`, `useTreeItemContext_unstable`) to read `size` / `appearance`
 * / `itemType`, so the rule agrees the directive is required and a suppression would be
 * flagged as an unused disable.
 */

import { clsx } from 'clsx';
import type { TreeItemPersonaLayoutSlots, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import { useTreeContext_unstable } from '../../contexts/treeContext';

import styles from './TreeItemPersonaLayout.module.css';

export const treeItemPersonaLayoutClassNames: SlotClassNames<TreeItemPersonaLayoutSlots> = {
  root: 'fui-TreeItemPersonaLayout',
  media: 'fui-TreeItemPersonaLayout__media',
  description: 'fui-TreeItemPersonaLayout__description',
  main: 'fui-TreeItemPersonaLayout__main',
  expandIcon: 'fui-TreeItemPersonaLayout__expandIcon',
  aside: 'fui-TreeItemPersonaLayout__aside',
  actions: 'fui-TreeItemPersonaLayout__actions',
  selector: 'fui-TreeItemPersonaLayout__selector',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Only `size` becomes an attribute — it is the one enum here with catalog variants
 * (`size-small` / `size-medium`). `appearance` and `itemType` stay module classes
 * (`styles[appearance]`, `styles[itemType]`): neither has a shared variant, and a
 * component package must not add one. That is the line react-badge and react-button
 * already drew — `styles[appearance]` / `styles[shape]` as classes, `data-size` as an
 * attribute.
 *
 * All three values come from context (TreeContext for `size`/`appearance`, TreeItemContext
 * for `itemType`), not from TreeItemPersonaLayout props, so
 * `TreeItemPersonaLayout.types.ts` is untouched — the cast below is local, as the cookbook
 * requires.
 */
type TreeItemPersonaLayoutRootDataAttributes = {
  'data-size': 'small' | 'medium';
};

/**
 * Apply styling to the TreeItemPersonaLayout slots based on the state
 */
export const useTreeItemPersonaLayoutStyles_unstable = (
  state: TreeItemPersonaLayoutState,
): TreeItemPersonaLayoutState => {
  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  const root = state.root as typeof state.root & TreeItemPersonaLayoutRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability
  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in
  // TreeItemPersonaLayout.module.css, not by the order of these arguments — see that
  // file's header for the mapping back to the mergeClasses() argument order this replaces
  // (itemType → appearance → size, which is NOT the order the slices are declared in, and
  // NOT the order the sibling TreeItemLayout applies them in either).
  //
  // `styles.subtle` is intentionally absent from the module (the Griffel slice is `{}`);
  // clsx drops the resulting `undefined`, matching the empty class string Griffel produces.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    treeItemPersonaLayoutClassNames.root,
    styles.root,
    styles[itemType],
    styles[appearance],
    state.root.className,
  );

  // eslint-disable-next-line react-hooks/immutability
  state.media.className = clsx(treeItemPersonaLayoutClassNames.media, styles.media, state.media.className);

  if (state.main) {
    // eslint-disable-next-line react-hooks/immutability
    state.main.className = clsx(
      treeItemPersonaLayoutClassNames.main,
      styles.main,
      state.description && styles.mainWithDescription,
      state.main.className,
    );
  }
  if (state.description) {
    // eslint-disable-next-line react-hooks/immutability
    state.description.className = clsx(
      treeItemPersonaLayoutClassNames.description,
      styles.description,
      state.description.className,
    );
  }
  if (state.actions) {
    // eslint-disable-next-line react-hooks/immutability
    state.actions.className = clsx(treeItemPersonaLayoutClassNames.actions, styles.actions, state.actions.className);
  }
  if (state.aside) {
    // eslint-disable-next-line react-hooks/immutability
    state.aside.className = clsx(treeItemPersonaLayoutClassNames.aside, styles.aside, state.aside.className);
  }
  if (state.expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.expandIcon.className = clsx(
      treeItemPersonaLayoutClassNames.expandIcon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }

  if (state.selector) {
    // eslint-disable-next-line react-hooks/immutability
    state.selector.className = clsx(treeItemPersonaLayoutClassNames.selector, state.selector.className);
  }

  return state;
};
