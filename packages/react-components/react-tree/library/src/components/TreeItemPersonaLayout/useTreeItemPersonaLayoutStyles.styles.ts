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

  const root = state.root as typeof state.root & TreeItemPersonaLayoutRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability
  root['data-size'] = size;

  // Module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe class; before D16
  // the removed `fui-TreeItemPersonaLayout` static was what held that position.
  //
  // The marker is a literal, unhashed, GLOBAL token and, since D16.1 retired the BEM
  // statics, this component's SOLE public identity class: it is the only handle by which
  // another module — in this package or any other — can style an element from its state,
  // because `styles.root` is hashed and unaddressable from outside this file.
  // TreeItem.module.css selects it exactly that way
  // (`& > :global(.group\/fui-tree-item-persona-layout)`); DECISIONS.md D15, Tier 0 — no
  // state mirrors needed.
  //
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
    styles.root,
    'group/fui-tree-item-persona-layout',
    styles[itemType],
    styles[appearance],
    state.root.className,
  );

  // eslint-disable-next-line react-hooks/immutability
  state.media.className = clsx(styles.media, state.media.className);

  if (state.main) {
    // eslint-disable-next-line react-hooks/immutability
    state.main.className = clsx(
      styles.main,
      state.description && styles['main-with-description'],
      state.main.className,
    );
  }
  if (state.description) {
    // eslint-disable-next-line react-hooks/immutability
    state.description.className = clsx(styles.description, state.description.className);
  }
  if (state.actions) {
    // eslint-disable-next-line react-hooks/immutability
    state.actions.className = clsx(styles.actions, state.actions.className);
  }
  if (state.aside) {
    // eslint-disable-next-line react-hooks/immutability
    state.aside.className = clsx(styles.aside, state.aside.className);
  }
  if (state.expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.expandIcon.className = clsx(styles['expand-icon'], state.expandIcon.className);
  }

  // NOTE: `selector` gets NO assignment. Its only library token was the
  // `fui-TreeItemPersonaLayout__selector` static, which DECISIONS.md D16.1 removed, and D16
  // §4d rules it must not be replaced by `clsx(state.selector.className)` — that is an
  // identity on the consumer's own string, i.e. dead code implying this hook styles a slot
  // it does not. The module declares no `.selector` local; if it ever gains one, restore
  // the assignment.

  return state;
};
