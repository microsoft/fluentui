/*
 * Griffel → Tailwind + CSS Modules migration (S-G):
 * `createFocusOutlineStyle` / `createCustomFocusIndicatorStyle` (and their option types)
 * are DELETED. They were Griffel style-object factories; converted packages use the shared
 * focus-ring CSS utilities (DECISIONS.md D6) instead. The `data-fui-focus-visible` /
 * `data-fui-focus-within` attributes the polyfills below manage remain the public focus
 * contract.
 */
export { applyFocusVisiblePolyfill } from './focusVisiblePolyfill';
export { applyFocusWithinPolyfill } from './focusWithinPolyfill';
