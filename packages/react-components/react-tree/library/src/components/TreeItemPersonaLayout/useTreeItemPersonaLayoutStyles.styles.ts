'use client';

/*
 * NOTE on the directive above:
 * `useTreeItemPersonaLayoutStyles_unstable` still calls React hooks
 * (`useTreeContext_unstable`, `useTreeItemContext_unstable`) to read `size` / `appearance`
 * / `itemType`, so `enforce-use-client` agrees the directive is required and it stays.
 * Converted styles files that call nothing carry no directive at all.
 */

import { clsx } from 'clsx';
import type { TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import { useTreeContext_unstable } from '../../contexts/treeContext';

import styles from './TreeItemPersonaLayout.module.css';

/**
 * Public identity class for TreeItemPersonaLayout.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + treeItemPersonaLayoutClassNames.root` is an INVALID selector — `/` is legal in a
 * class TOKEN but terminates the name in selector position. Use
 * `fuiSelector(treeItemPersonaLayoutClassNames.root)` from `@fluentui/react-utilities`.
 */
export const treeItemPersonaLayoutClassNames: { root: string } = {
  root: 'group/fui-tree-item-persona-layout',
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

  const rootDataAttributes: TreeItemPersonaLayoutRootDataAttributes = {
    'data-size': size,
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(
        styles.root,
        treeItemPersonaLayoutClassNames.root,
        styles[itemType],
        styles[appearance],
        state.root.className,
      ),
    },
  };

  state = { ...state, media: { ...state.media, className: clsx(styles.media, state.media.className) } };

  if (state.main) {
    state = {
      ...state,
      main: {
        ...state.main,
        className: clsx(styles.main, state.description && styles['main-with-description'], state.main.className),
      },
    };
  }
  if (state.description) {
    state = {
      ...state,
      description: { ...state.description, className: clsx(styles.description, state.description.className) },
    };
  }
  if (state.actions) {
    state = { ...state, actions: { ...state.actions, className: clsx(styles.actions, state.actions.className) } };
  }
  if (state.aside) {
    state = { ...state, aside: { ...state.aside, className: clsx(styles.aside, state.aside.className) } };
  }
  if (state.expandIcon) {
    state = {
      ...state,
      expandIcon: { ...state.expandIcon, className: clsx(styles['expand-icon'], state.expandIcon.className) },
    };
  }

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return state;
};
