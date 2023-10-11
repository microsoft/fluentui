import { useDocument, useWindow, WindowProviderProps } from '@fluentui/react-window-provider';

/**
 * Get a reference to the `document` object.
 * Use this in place of the global `document` in React function components.
 * @returns Document
 */
export const useDocumentEx = () => {
  // eslint-disable-next-line no-restricted-globals
  return useDocument() ?? document;
};

/**
 * Get a reference to the `window` object.
 * Use this in place of the global `window` in React function components.
 * @returns Window
 */
export const useWindowEx = () => {
  // eslint-disable-next-line no-restricted-globals
  return useWindow() ?? window;
};

/**
 * Get a reference to the `document` object.
 * Use this in place of the global `document` in React class components.
 *
 * @param ctx - Class component WindowContext
 * @returns Document
 */
export const getDocumentEx = (ctx: Pick<WindowProviderProps, 'window'> | undefined) => {
  // eslint-disable-next-line no-restricted-globals
  return ctx?.window?.document ?? document;
};

/**
 * Get a reference to the `window` object.
 * Use this in place of the global `window` in React class components.
 *
 * @param ctx - Class component WindowContext
 * @returns Window
 */
export const getWindowEx = (ctx: Pick<WindowProviderProps, 'window'> | undefined) => {
  // eslint-disable-next-line no-restricted-globals
  return ctx?.window ?? window;
};
