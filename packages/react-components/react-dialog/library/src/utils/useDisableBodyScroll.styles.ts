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
