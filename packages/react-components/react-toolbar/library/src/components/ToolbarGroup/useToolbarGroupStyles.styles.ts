'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { ToolbarGroupSlots, ToolbarGroupState } from './ToolbarGroup.types';

import styles from './ToolbarGroup.module.css';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `vertical` is optional on ToolbarGroupState — it is injected from ToolbarContext, so it
 * is `undefined` when a ToolbarGroup is rendered outside a Toolbar. `undefined` was falsy
 * for the Griffel `vertical && …` gate and maps to `"horizontal"` here: same branch.
 */
type ToolbarGroupRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  const { vertical } = state;

  const root = state.root as ToolbarGroupState['root'] & ToolbarGroupRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this ToolbarGroup's state, because
  // `styles.root` is hashed and unaddressable from outside this file. `data-orientation` is
  // already stamped on this very element above, so a descendant ToolbarButton can read
  // `@variant group-orientation-vertical/fui-toolbar-group { … }` and distinguish it from
  // the enclosing Toolbar's own orientation (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ToolbarGroup.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    toolbarGroupClassNames.root,
    'group/fui-toolbar-group',
    styles.root,
    state.root.className,
  );

  return state;
};
