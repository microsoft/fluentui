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

import styles from './StyledText.module.css';

/*
 * Three maps, ONE module. The Griffel original split these across three `makeStyles` calls
 * so each could be invoked independently; a CSS Module is a file, not a call, and all 26
 * slices belong to the same component at the same altitude, so they share
 * `StyledText.module.css` (same call react-text made for its 17 presets). The three exported
 * accessors are preserved because `StyledText/index.tsx` exports them.
 *
 * `.root` is the identity-only local: StyledText's root composition is entirely conditional,
 * so without it the group marker would be `classList[0]` (D16.2). See the module header.
 */

const sizeStyles = {
  base100: styles.base100,
  base200: styles.base200,
  base300: styles.base300,
  base400: styles.base400,
  base500: styles.base500,
  base600: styles.base600,
  hero700: styles.hero700,
};

const weightStyles = {
  light: styles.light,
  semilight: styles.semilight,
  regular: styles.regular,
  medium: styles.medium,
  semibold: styles.semibold,
  bold: styles.bold,
};

const textStyles = {
  mention: styles.mention,
  mentionMe: styles['mention-me'],
  disabled: styles.disabled,
  error: styles.error,
  important: styles.important,
  success: styles.success,
  temporary: styles.temporary,
  timestamp: styles.timestamp,
  nowrap: styles.nowrap,
  truncate: styles.truncate,
  alignCenter: styles['align-center'],
  alignEnd: styles['align-end'],
  alignJustify: styles['align-justify'],
};

/** Identity-only root class — see the note above and `StyledText.module.css`. */
export const styledTextRootClassName: string = styles.root;

export const useSizeStyles = (): typeof sizeStyles => sizeStyles;

export const useWeightStyles = (): typeof weightStyles => weightStyles;

export const useStyles = (): typeof textStyles => textStyles;
