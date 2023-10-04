import { useDocument, useWindow, WindowProviderProps } from '@fluentui/react-window-provider';

/**
 * Wrapper for `useDocument()` that falls back to `document` if the provider is not set.
 * @returns Document
 */
export const useDocumentEx = () => {
  // eslint-disable-next-line no-restricted-globals
  return useDocument() ?? document;
};

/**
 * Wrapper for `useWindow()` that falls back to `window` if the provider is not set.
 * @returns Window
 */
export const useWindowEx = () => {
  // eslint-disable-next-line no-restricted-globals
  return useWindow() ?? window;
};

/**
 * Helper for reading class component WindowContext. Falls back to `document` if the provider is not set.
 *
 * @param ctx - Class component WindowContext
 * @returns Document
 */
export const getDocumentEx = (ctx: Pick<WindowProviderProps, 'window'> | undefined) => {
  // eslint-disable-next-line no-restricted-globals
  return ctx?.window?.document ?? document;
};

/**
 * Helper for reading class component WindowContext. Falls back to `window` if the provider is not set.
 *
 * @param ctx - Class component WindowContext
 * @returns Window
 */
export const getWindowEx = (ctx: Pick<WindowProviderProps, 'window'> | undefined) => {
  // eslint-disable-next-line no-restricted-globals
  return ctx?.window ?? window;
};
