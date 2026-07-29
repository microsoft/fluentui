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
import type { BreadcrumbState } from './Breadcrumb.types';

import styles from './Breadcrumb.module.css';

/**
 * Public identity class for Breadcrumb.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot `list` key was removed: there is no public
 * class-name handle on component internals any more (DECISIONS.md D16.1).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + breadcrumbClassNames.root` is a `SyntaxError`. Build selectors with
 * `fuiSelector(breadcrumbClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * token-taking DOM APIs (`classList.contains`, `getElementsByClassName`) need no escaping.
 */
export const breadcrumbClassNames: { root: string } = {
  root: 'group/fui-breadcrumb',
};

/**
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useBreadcrumbStyles_unstable = (state: BreadcrumbState): BreadcrumbState => {
  // Module class FIRST, then the named group marker — which must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1/D16.2) — with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token, and since
  // the BEM statics were removed (D16.1) it is this component's SOLE public identity class:
  // the only handle by which a consumer, or another module in this package or any other, can
  // select or style an element from this Breadcrumb's state, because a `*.module.css` class
  // is hashed and unaddressable from outside its own file. Read it as
  // `@variant group-…/fui-breadcrumb { … }` (DECISIONS.md D15). Only the outermost slot
  // carries a marker; `list` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Breadcrumb.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The root slot has no styles of its OWN — the Griffel hook merged only the static class —
  // so `styles.root` is an IDENTITY-ONLY local, present purely to keep a hashed,
  // selector-safe token at `classList[0]`; Breadcrumb.module.css explains why it carries an
  // inert custom property rather than an empty body. It is unconditional by construction,
  // which is what keeps the marker's position safe now that the static class it used to sit
  // behind is gone (D16.2 — this is one of the six Class B roots). No data attribute is
  // stamped here: `size` lives on BreadcrumbContext and is read by the child components' own
  // styles hooks.
  state.root.className = clsx(styles.root, 'group/fui-breadcrumb', state.root.className);

  if (state.list) {
    // `list` carries no marker and no static any more — just its own hashed module class,
    // which becomes `classList[0]`. D15.1 is not in play on a marker-free slot.
    state.list.className = clsx(styles.list, state.list.className);
  }

  return state;
};
