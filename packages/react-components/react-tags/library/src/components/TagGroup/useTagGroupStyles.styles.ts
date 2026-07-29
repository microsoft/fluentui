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
import type { TagGroupState } from './TagGroup.types';

import styles from './TagGroup.module.css';

/**
 * Public identity class for TagGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + tagGroupClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN but
 * terminates the name in selector position. Use `fuiSelector(tagGroupClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const tagGroupClassNames: { root: string } = {
  root: 'group/fui-tag-group',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants
 * (DECISIONS.md D3) rather than a class per step.
 */
type TagGroupRootDataAttributes = {
  'data-size': TagGroupState['size'];
};

/**
 * Apply styling to the TagGroup slots based on the state
 */
export const useTagGroupStyles_unstable = (state: TagGroupState): TagGroupState => {
  const { size } = state;

  const root = state.root as TagGroupState['root'] & TagGroupRootDataAttributes;

  root['data-size'] = size;

  // Module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe class; before D16
  // the removed `fui-TagGroup` static was what held that position.
  //
  // The marker is a literal, unhashed, GLOBAL token and, since D16.1 retired the BEM
  // statics, TagGroup's SOLE public identity class: it is the only handle by which another
  // module — in this package or any other — can style an element from this TagGroup's
  // state, because `styles.root` is hashed and unaddressable from outside this file. Every
  // Tag / InteractionTag rendered inside can read the group's own `data-size` through
  // `@variant group-size-small/fui-tag-group { … }` (DECISIONS.md D15, Tier 0 — no state
  // mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TagGroup.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-tag-group', state.root.className);

  return state;
};
