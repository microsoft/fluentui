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
import type { ToolbarSlots, ToolbarState } from './Toolbar.types';

import styles from './Toolbar.module.css';

export const toolbarClassNames: SlotClassNames<ToolbarSlots> = {
  root: 'fui-Toolbar',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md).
 *
 * Both are stamped UNCONDITIONALLY. `data-size` in particular is written even on a
 * vertical toolbar, where the Griffel hook applied no size slice: the `!vertical` half of
 * that gate is expressed in CSS by nesting the size variants inside `@variant horizontal`
 * (see Toolbar.module.css), not by withholding the attribute. Toolbar also publishes
 * `size` to its children through ToolbarContext, so an absent `data-size` would make the
 * DOM disagree with the state the children are reading.
 */
type ToolbarRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size': ToolbarState['size'];
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  const { vertical, size } = state;

  const root = state.root as ToolbarState['root'] & ToolbarRootDataAttributes;

  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';
  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Toolbar's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Toolbar is the outermost of four
  // nested components (Toolbar > ToolbarGroup > ToolbarButton / ToolbarDivider), each of
  // which now carries its own marker, so a descendant can read whichever ancestor it
  // actually cares about — e.g. `@variant group-orientation-vertical/fui-toolbar { … }`
  // (DECISIONS.md D15, Tier 0 — `data-orientation` and `data-size` are already on this
  // element).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Toolbar.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(toolbarClassNames.root, 'group/fui-toolbar', styles.root, state.root.className);

  return state;
};
