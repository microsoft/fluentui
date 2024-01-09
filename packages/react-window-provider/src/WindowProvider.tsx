import * as React from 'react';

/**
 * Props for the WindowProvider component.
 */
export type WindowProviderProps = {
  /**
   * Provide the active window.
   */
  window: Window | undefined;
  children?: React.ReactNode;
};

/**
 * Context for providing the window.
 */
// eslint-disable-next-line @fluentui/no-context-default-value
export const WindowContext = React.createContext<WindowProviderProps>({
  // eslint-disable-next-line no-restricted-globals
  window: typeof window === 'object' ? window : undefined,
});

/**
 * Hook to access the window object. This can be overridden contextually using the `WindowProvider`.
 */
export const useWindow = (): Window | undefined => React.useContext(WindowContext).window;

/**
 * Hook to access the document object. This can be overridden contextually using the `WindowProvider`.
 */
export const useDocument = (): Document | undefined => React.useContext(WindowContext).window?.document;

/**
 * Component to provide the window object contextually. This is useful when rendering content to an element
 * contained within a child window or iframe element, where event handlers and styling must be projected
 * to an alternative window or document.
 */
export const WindowProvider: React.FunctionComponent<WindowProviderProps> = props => {
  return <WindowContext.Provider value={props}>{props.children}</WindowContext.Provider>;
};
