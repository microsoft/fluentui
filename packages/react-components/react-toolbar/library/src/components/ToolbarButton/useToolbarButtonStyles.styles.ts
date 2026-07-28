'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks (Toolbar, ToolbarGroup), this file needs NO
 * `enforce-use-client` suppression: it still calls `useButtonStyles_unstable`, so the rule
 * agrees the directive is required. Converted hooks that call nothing carry a trailing
 * `eslint-disable-line` instead — see useToolbarStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarButtonState } from './ToolbarButton.types';

import styles from './ToolbarButton.module.css';

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * It sits on the ROOT only, even though one of the two slices styles the `icon` slot: the
 * icon is the root's child and is selected through its owner's static class,
 * `:global(.fui-Button__icon)` (same approach react-button uses for its own size-scoped
 * icon rules). That keeps the icon slot free of both a data attribute and a class of ours.
 */
type ToolbarButtonRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the ToolbarButton slots based on the state
 */
export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState): void => {
  const root = state.root as ToolbarButtonState['root'] & ToolbarButtonRootDataAttributes;

  // The state-mutation pattern is PRESERVED during conversion (CONVERSION_GUIDE §3,
  // DECISIONS.md D14): the mixed-mode sibling seam and the customStyleHooks contract both
  // depend on the shared object. Its removal is a single Phase 3 sweep.
  // eslint-disable-next-line react-hooks/immutability
  root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';

  // Named group marker FIRST, consumer className last. The marker is a literal, unhashed,
  // GLOBAL token: it is the only handle by which another module — in this package or any
  // other — can style an element from this ToolbarButton's state, because `styles.root` is
  // hashed and unaddressable from outside this file. `data-orientation` is already stamped
  // on this very element above (DECISIONS.md D15, Tier 0 — no state mirrors needed).
  //
  // Unlike the converted leaf hooks there is no static `fui-ToolbarButton` class to sit
  // beside: this root IS react-button's root, and `useButtonStyles_unstable` (called below)
  // contributes `fui-Button` plus its own `group/fui-button` marker to the same element.
  // Both markers therefore land on it, which is correct — the element genuinely is both a
  // Button and a ToolbarButton, and a descendant can address whichever identity it means.
  // "First" here means first argument of THIS clsx; because the Button hook runs afterwards
  // and prepends its own arguments, the marker is not first in the final class string. That
  // is immaterial — class order within the attribute has no effect on matching.
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // ToolbarButton.module.css — everything here is `fui.components.l2`, because both slices
  // style @fluentui/react-button's slots rather than elements of our own. See that file's
  // header for the mapping back to the mergeClasses() argument order this replaces.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx('group/fui-toolbar-button', styles.root, state.root.className);

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made ToolbarButton win under Griffel.
  // The layer altitude reproduces that winner now, but the call order still has to stand
  // so the consumer className stays last in the rendered class attribute.
  useButtonStyles_unstable(state);
};
