import * as React from 'react';
export type HTMLDirection = 'rtl' | 'ltr' | 'auto';

export interface StylesheetContextType {
  target: Document | undefined;
  registerStyles: (stylesheets: string[], context: StylesheetContextType) => void;
  styleCache: WeakMap<Document, Map<string, boolean>>;
  enqueuedSheets: string[];
  renderStyles: (stylesheets: string[], context: StylesheetContextType) => void;
}

/**
 * Default registerStyles function for stylesheets.
 */
export const registerStyles = (stylesheets: string[], context: StylesheetContextType) => {
  const { styleCache, target } = context;

  // Grab the style cache for the target document.
  let targetStylesheets = styleCache.get(target!);

  if (!targetStylesheets) {
    targetStylesheets = new Map();
    styleCache.set(target!, targetStylesheets);
  }

  for (const stylesheet of stylesheets) {
    if (!targetStylesheets.has(stylesheet)) {
      context.enqueuedSheets.unshift(stylesheet);
      targetStylesheets.set(stylesheet, true);
    }
  }

  // If there is no target, call renderStyles immediately, expecting that there is no.
  const isSSR = !target;

  if (isSSR) {
    renderStyles(context.enqueuedSheets, context);
  }
};

/**
 * Default renderStyles implementation, which will render the give sheets to the contextual
 * target.
 */
const renderStyles = (sheets: string[], context: StylesheetContextType) => {
  const { target } = context;

  if (sheets.length && target) {
    const styleElement = target.createElement('style');

    styleElement.textContent = sheets.join('');
    target.head.appendChild(styleElement);
  }
};

// Shared stylesheet context, providing the registration function and target document.
export const StylesheetContext = React.createContext<StylesheetContextType>({
  registerStyles,
  renderStyles,
  target: typeof window === 'object' ? window.document : undefined,
  styleCache: new WeakMap<Document, Map<string, boolean>>(),
  enqueuedSheets: [],
});
