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
import type { LinkSlots, LinkState } from './Link.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Link.module.css';

export const linkClassNames: SlotClassNames<LinkSlots> = {
  root: 'fui-Link',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Both are *presence* selectors, so the flags are written `flag || undefined` — React
 * omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-inline="false"` and still match `[data-inline]`.
 *
 * `data-disabled` is the headless preview's own name for this exact value: its `useLink`
 * writes `data-disabled` from `state.disabled` too (reports/headless-precedent.md). By
 * the time this hook runs, `useLinkState_unstable` has already widened `state.disabled`
 * to `disabled || disabledFocusable`, which is the condition the Griffel
 * `disabled && styles.disabled` argument branched on — so no separate
 * `data-disabled-focusable` attribute is needed here (nothing in Link.module.css
 * distinguishes the two, unlike Button).
 *
 * `data-inline` is new (no headless precedent); it follows the react-divider pilot's
 * `data-inset` shape — a boolean styling opt-in expressed as a presence attribute.
 *
 * `as`/`href` stay JS-side class lookups (`styles.href`, `styles.button`) rather than
 * attributes: they select on the rendered element type, which is not component state and
 * has no data-attribute precedent.
 */
type LinkRootDataAttributes = {
  'data-disabled'?: true;
  'data-inline'?: true;
};

export const useLinkStyles_unstable = (state: LinkState): LinkState => {
  const { appearance, disabled, inline, root, backgroundAppearance } = state;

  const rootWithData = state.root as LinkState['root'] & LinkRootDataAttributes;

  rootWithData['data-disabled'] = disabled || undefined;
  rootWithData['data-inline'] = inline || undefined;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this Link's state, because `styles.root` is hashed and unaddressable from
  // outside this file. Link needs no state mirrors: `data-disabled` and `data-inline` are
  // already stamped on this very element above, and `:hover` / `:active` /
  // `:focus-visible` are pseudo-class states that are true of the root whenever they are
  // true of its subtree — so `@variant group-hover/fui-link`,
  // `group-disabled/fui-link` etc. work with no JS change (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order — and, within
  // `fui.components.l1`, by block order — in Link.module.css, not by the order of these
  // arguments. See that file's header for the mapping back to the mergeClasses()
  // argument order this replaces, including the documented disabled-vs-inverted/brand
  // `color` inversion.
  //
  // `appearance` keeps its literal `=== 'subtle'` test rather than a `styles[appearance]`
  // lookup: the Griffel source has no `default` slice at all (the base styles ARE the
  // default appearance), so there is no class to look up for it.
  state.root.className = clsx(
    'group/fui-link',
    linkClassNames.root,
    styles.root,
    root.as === 'a' && root.href && styles.href,
    root.as === 'button' && styles.button,
    appearance === 'subtle' && styles.subtle,
    backgroundAppearance && styles[backgroundAppearance],
    state.root.className,
  );

  return state;
};
