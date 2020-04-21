import * as React from 'react';

/**
 * Interface for the StylesheetProvider.
 */
export interface StylesheetProviderProps {
  register?: (stylesheets: string[], target: Document) => void;
  hasRegistered?: (stylesheet: string, target: Document) => boolean;
  target?: Document;
}

export interface StylesheetContextType {
  register: (stylesheets: string[]) => void;
  hasRegistered: (stylehseet: string) => boolean;
}

// Cache for which documents have registered which stylesheets.
const docStyleMap = new WeakMap<Document, Map<string, boolean>>();

// Default registration function for stylesheets.
const defaultRegister = (stylesheets: string[], target: Document) => {
  let styleMap = docStyleMap.get(target);
  let contentToRegister = '';

  if (!styleMap) {
    styleMap = new Map();
    docStyleMap.set(target, styleMap);
  }

  for (const stylesheet of stylesheets) {
    if (!styleMap.has(stylesheet)) {
      contentToRegister += stylesheet;
      styleMap.set(stylesheet, true);
    }
  }

  if (contentToRegister) {
    const styleElement = target.createElement('style');

    styleElement.textContent = contentToRegister;
    // styleElement.appendChild(target.createTextNode(contentToRegister));

    target.head.appendChild(styleElement);
  }
};

const defaultHasRegistered = (stylesheet: string, target: Document): boolean => {
  const styleMap = docStyleMap.get(target);

  if (styleMap) {
    return styleMap.has(stylesheet);
  }

  return false;
};

const createStylesheetContext = ({
  register = defaultRegister,
  hasRegistered = defaultHasRegistered,
  target = document,
}: StylesheetProviderProps): StylesheetContextType => ({
  register: (stylesheets: string[]) => register(stylesheets, target!),
  hasRegistered: (stylesheet: string) => hasRegistered(stylesheet, target!),
});

// Shared stylesheet context, providing the registration function and target document.
const StylesheetContext = React.createContext<StylesheetContextType>(createStylesheetContext({}));

/**
 * Provider for registering stylesheets in a given target document.
 * The `register` method can be called many times and will only register once
 * per unique target document.
 */
export const StylesheetProvider = (props: React.PropsWithChildren<StylesheetProviderProps>) => {
  const [context] = React.useState(() => createStylesheetContext(props));

  return <StylesheetContext.Provider value={context}>{props.children}</StylesheetContext.Provider>;
};

export const StylesheetConsumer = StylesheetContext.Consumer;

export const useStylesheet = () => React.useContext(StylesheetContext);
