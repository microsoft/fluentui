import * as React from 'react';
export type HTMLDirection = 'rtl' | 'ltr' | 'auto';

export interface StylesheetContextType {
  target: Document | undefined;
  register: (stylesheets: string[], context: StylesheetContextType) => void;
  styleCache: WeakMap<Document, Map<string, boolean>>;
  enqueuedSheets: string[];
  renderSheets: (stylesheets: string[], context: StylesheetContextType) => void;
}

/**
 * Default registration function for stylesheets.
 */
export const register = (stylesheets: string[], context: StylesheetContextType) => {
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

  // If there is no target, call renderSheets immediately.
  if (!target) {
    renderSheets(context.enqueuedSheets, context);
  }
};

/**
 * Default renderSheets implementation, which will render the give sheets to the contextual
 * target.
 */
const renderSheets = (sheets: string[], context: StylesheetContextType) => {
  const { target, enqueuedSheets } = context;

  if (enqueuedSheets.length && target) {
    const styleElement = target.createElement('style');

    styleElement.textContent = sheets.join('');
    target.head.appendChild(styleElement);
  }
};

// Shared stylesheet context, providing the registration function and target document.
export const StylesheetContext = React.createContext<StylesheetContextType>({
  register,
  renderSheets,
  target: typeof window === 'object' ? window.document : undefined,
  styleCache: new WeakMap<Document, Map<string, boolean>>(),
  enqueuedSheets: [],
});
