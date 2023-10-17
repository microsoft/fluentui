import { useDocument, useWindow, WindowProviderProps } from '@fluentui/react-window-provider';

/**
 * NOTE: the check for `window`/`document` is a bit verbose and perhaps
 * overkill but it ensures the prior assumbed behavior of directly
 * calling `window`/`document` is preserved.
 *
 * It is possible to set `window` to undefined on `WindowProvider` so
 * we'll fallback to directly accessing the global in that (hopefully unlikely)
 * case.
 */

/**
 * Get a reference to the `document` object.
 * Use this in place of the global `document` in React function components.
 * @returns Document | undefined
 */
export const useDocumentEx = () => {
  // eslint-disable-next-line no-restricted-globals
  return useDocument() ?? typeof document !== 'undefined' ? document : undefined;
};

/**
 * Get a reference to the `window` object.
 * Use this in place of the global `window` in React function components.
 * @returns Window | undefined
 */
export const useWindowEx = () => {
  // eslint-disable-next-line no-restricted-globals
  return useWindow() ?? typeof window !== 'undefined' ? window : undefined;
};

/**
 * Get a reference to the `document` object.
 * Use this in place of the global `document` in React class components.
 *
 * @param ctx - Class component WindowContext
 * @returns Document | undefined
 */
export const getDocumentEx = (ctx: Pick<WindowProviderProps, 'window'> | undefined) => {
  // eslint-disable-next-line no-restricted-globals
  return ctx?.window?.document ?? typeof document !== 'undefined' ? document : undefined;
};

/**
 * Get a reference to the `window` object.
 * Use this in place of the global `window` in React class components.
 *
 * @param ctx - Class component WindowContext
 * @returns Window | undefined
 */
export const getWindowEx = (ctx: Pick<WindowProviderProps, 'window'> | undefined) => {
  // eslint-disable-next-line no-restricted-globals
  return ctx?.window ?? typeof window !== 'undefined' ? window : undefined;
};
