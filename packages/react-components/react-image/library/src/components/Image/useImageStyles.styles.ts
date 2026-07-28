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
import type { ImageSlots, ImageState } from './Image.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Image.module.css';

export const imageClassNames: SlotClassNames<ImageSlots> = {
  root: 'fui-Image',
};

export const useImageStyles_unstable = (state: ImageState): ImageState => {
  const { block, bordered, fit, shadow, shape } = state;

  const { height, width } = state.root;
  // eslint-disable-next-line eqeqeq
  const hasExplicitSize = height != null || width != null;
  const shouldApplyFitFill = fit !== 'default' && !hasExplicitSize;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this Image, because `styles.root` is hashed and unaddressable from outside
  // this file. Image stamps NO data attributes by design (every prop it styles is a look
  // prop expressed as a module class — see Image.module.css's header), so the marker is
  // inert until a descendant reads a pseudo-class state such as
  // `@variant group-hover/fui-image`. It is added anyway: markers are per-component
  // identity, not per-state (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Image.module.css and by
  // block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces.
  //
  // `styles[fit]` is undefined for fit="default" and `styles[shape]` is undefined for
  // shape="square": both are empty `{}` slices in the Griffel original, so the module
  // deliberately declares no rule for them and clsx drops the undefined entries.
  //
  // The state mutation below is preserved deliberately (DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep). The Griffel original's
  // `eslint-disable-next-line react-hooks/immutability` is dropped because the rule no
  // longer reports here — same as the react-divider and react-button conversions.
  state.root.className = clsx(
    'group/fui-image',
    imageClassNames.root,
    styles.root,
    block && styles.block,
    bordered && styles.bordered,
    shadow && styles.shadow,
    styles[fit],
    shouldApplyFitFill && styles['fit-fill'],
    styles[shape],
    state.root.className,
  );

  return state;
};
