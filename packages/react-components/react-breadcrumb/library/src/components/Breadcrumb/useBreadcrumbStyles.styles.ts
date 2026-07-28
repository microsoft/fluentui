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
import type { BreadcrumbSlots, BreadcrumbState } from './Breadcrumb.types';

import styles from './Breadcrumb.module.css';

export const breadcrumbClassNames: SlotClassNames<BreadcrumbSlots> = {
  root: 'fui-Breadcrumb',
  list: 'fui-Breadcrumb__list',
};

/**
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useBreadcrumbStyles_unstable = (state: BreadcrumbState): BreadcrumbState => {
  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Breadcrumb's state, because a
  // `*.module.css` class is hashed and unaddressable from outside its own file. Read it as
  // `@variant group-…/fui-breadcrumb { … }` (DECISIONS.md D15). Only the outermost slot
  // carries a marker; `list` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Breadcrumb.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The root slot has no styles of its own: the Griffel hook merged only the static class,
  // so there is no `styles.root` to apply and no data attribute to stamp. `size` lives on
  // BreadcrumbContext and is read by the child components' own styles hooks.
  state.root.className = clsx(breadcrumbClassNames.root, 'group/fui-breadcrumb', state.root.className);

  if (state.list) {
    state.list.className = clsx(breadcrumbClassNames.list, styles.list, state.list.className);
  }

  return state;
};
