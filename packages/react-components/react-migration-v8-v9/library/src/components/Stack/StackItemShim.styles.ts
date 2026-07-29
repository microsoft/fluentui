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

import styles from './StackItemShim.module.css';

/*
 * As in StackShim.styles.ts: the exported functions keep their `use*` names and signatures
 * so StackItemShim.tsx is unchanged at every call site, but they are no longer hooks.
 *
 * The CATALOG KEYS BELOW ARE LOAD-BEARING RUNTIME LOOKUPS — StackItemShim.tsx indexes these
 * maps by raw prop values (`alignSelfStyles[align]` :28, `orderFlexStyles[order]` :31,
 * `growFlexStyles[grow]` :35, `shrinkFlexStyles[1]` / `[0]` :40,42). The module-local class
 * names differ (`order-minus-3`, `shrink-0`) only because a CSS class cannot be named `-3`
 * or `0`; this file is the mapping between the two.
 */

const stackItemShimStyles = {
  root: styles.root,
  disableShrink: styles['disable-shrink'],
  verticalFill: styles['vertical-fill'],
} as const;

const flexAlignSelfStyles: Record<string, string> = {
  auto: styles['align-self-auto'],
  baseline: styles['align-self-baseline'],
  center: styles['align-self-center'],
  start: styles['align-self-start'],
  end: styles['align-self-end'],
  stretch: styles['align-self-stretch'],
};

const flexGrowStyles: Record<string, string> = {
  inherit: styles['grow-inherit'],
  initial: styles['grow-initial'],
  revert: styles['grow-revert'],
  unset: styles['grow-unset'],
  '1': styles['grow-1'],
  '2': styles['grow-2'],
  '3': styles['grow-3'],
};

const flexShrinkStyles: Record<string, string> = {
  inherit: styles['shrink-inherit'],
  initial: styles['shrink-initial'],
  revert: styles['shrink-revert'],
  unset: styles['shrink-unset'],
  '0': styles['shrink-0'],
  '1': styles['shrink-1'],
  '2': styles['shrink-2'],
};

const flexOrderStyles: Record<string, string> = {
  inherit: styles['order-inherit'],
  initial: styles['order-initial'],
  unset: styles['order-unset'],
  revert: styles['order-revert'],
  '-3': styles['order-minus-3'],
  '-2': styles['order-minus-2'],
  '-1': styles['order-minus-1'],
  '0': styles['order-0'],
  '1': styles['order-1'],
  '2': styles['order-2'],
  '3': styles['order-3'],
};

export const useStackItemShimStyles = (): typeof stackItemShimStyles => stackItemShimStyles;

export const useFlexAlignSelfStyles = (): Record<string, string> => flexAlignSelfStyles;

export const useFlexGrowStyles = (): Record<string, string> => flexGrowStyles;

export const useFlexShrinkStyles = (): Record<string, string> => flexShrinkStyles;

export const useFlexOrderStyles = (): Record<string, string> => flexOrderStyles;
