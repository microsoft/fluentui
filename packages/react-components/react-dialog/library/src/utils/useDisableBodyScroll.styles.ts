'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeResetStyles`
 * is gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import styles from './useDisableBodyScroll.module.css';

/**
 * this style must be applied to the html element to disable scrolling
 *
 * Kept as a zero-argument FUNCTION rather than becoming a bare string constant so its call
 * site in `useDisableBodyScroll.ts` — and the `React.useCallback` dependency lists that close
 * over its result — are unchanged from when this was a Griffel `makeResetStyles` hook. It no
 * longer calls any React hook, and the class it returns is a compile-time constant.
 */
export const useHTMLNoScrollStyles = (): string => styles['html-no-scroll'];

/**
 * this style must be applied to the body element to disable scrolling
 *
 * Same shape and same reason as {@link useHTMLNoScrollStyles}.
 */
export const useBodyNoScrollStyles = (): string => styles['body-no-scroll'];
