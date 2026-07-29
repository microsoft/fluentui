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

import styles from './Checkbox.module.css';

/*
 * `useCheckboxStyles` keeps its name and signature so CheckboxShim.tsx is unchanged at the
 * call site, but it is no longer a hook. The one rule it carries sits at
 * `@layer fui.components.l2` — see Checkbox.module.css for why that altitude, and why the
 * consumer's v8 `styles.root` still beats it.
 */
const checkboxStyles = {
  root: styles.root,
} as const;

export const useCheckboxStyles = (): typeof checkboxStyles => checkboxStyles;
