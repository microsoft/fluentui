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

import styles from './StackShim.module.css';

/*
 * The exported functions keep their `use*` names and their call signatures so StackShim.tsx
 * is unchanged at every call site, but they are no longer hooks: `makeStyles` is gone and
 * these now hand back a frozen map of generated CSS-Modules class names. Cascade priority is
 * decided by the `@layer fui.*` order in StackShim.module.css, not by argument order — see
 * that file's header for the mapping back to the mergeClasses() argument order it replaces.
 *
 * The CATALOG KEYS BELOW ARE LOAD-BEARING RUNTIME LOOKUPS. StackShim.tsx indexes these maps
 * by raw prop values — `growFlexStyles[grow]` (:124), `justifyContentFlexStyles[horizontalAlign]`
 * (:134), `alignItemsFlexStyles[verticalAlign]` (:144) — so `'1'`, `'space-between'`, … must
 * stay exactly as they are. The module-local class names differ (`grow-1`,
 * `align-items-space-between`) only because a CSS class cannot be named `1`; this file is the
 * mapping between the two and is the only place either name should be written.
 */

const stackStyles = {
  root: styles.root,
  horizontal: styles.horizontal,
  verticalFill: styles['vertical-fill'],
  reversedVertical: styles['reversed-vertical'],
  reversedHorizontal: styles['reversed-horizontal'],
  disableShrink: styles['disable-shrink'],
  wrap: styles.wrap,
  inner: styles.inner,
  innerWidth: styles['inner-width'],
} as const;

const flexGrowStyles: Record<string, string> = {
  inherit: styles['grow-inherit'],
  initial: styles['grow-initial'],
  revert: styles['grow-revert'],
  unset: styles['grow-unset'],
  '1': styles['grow-1'],
  '2': styles['grow-2'],
  '3': styles['grow-3'],
};

const flexAlignItemsStyles: Record<string, string> = {
  baseline: styles['align-items-baseline'],
  center: styles['align-items-center'],
  start: styles['align-items-start'],
  end: styles['align-items-end'],
  stretch: styles['align-items-stretch'],
  'space-between': styles['align-items-space-between'],
  'space-around': styles['align-items-space-around'],
  'space-evenly': styles['align-items-space-evenly'],
};

const flexJustifyContentStyles: Record<string, string> = {
  baseline: styles['justify-content-baseline'],
  center: styles['justify-content-center'],
  start: styles['justify-content-start'],
  end: styles['justify-content-end'],
  stretch: styles['justify-content-stretch'],
  'space-between': styles['justify-content-space-between'],
  'space-around': styles['justify-content-space-around'],
  'space-evenly': styles['justify-content-space-evenly'],
};

export const useStackStyles = (): typeof stackStyles => stackStyles;

export const useFlexGrowStyles = (): Record<string, string> => flexGrowStyles;

export const useFlexAlignItemsStyles = (): Record<string, string> => flexAlignItemsStyles;

export const useFlexJustifyContentStyles = (): Record<string, string> => flexJustifyContentStyles;
