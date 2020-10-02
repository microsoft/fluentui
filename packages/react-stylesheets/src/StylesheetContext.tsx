import * as React from 'react';
export type HTMLDirection = 'rtl' | 'ltr' | 'auto';

const defaultDocument = { document: 'document' };

export interface StylesheetContextType {
  target: Document | undefined;
  registerStyles: (stylesheets: undefined | string | string[], context: StylesheetContextType) => void;
  styleCache: WeakMap<Document | typeof defaultDocument, Map<string, boolean>>;
  renderStyles: (stylesheets: string[], context: StylesheetContextType) => void;
}

/**
 * Register styles can be called with a single or multiple stylesheets. Each will be evaluated
 * if they've been registered already, and then passed along to `renderStyles` if they're new
 * to the given context.
 */
export const registerStyles = (sheets: undefined | string | string[], context: StylesheetContextType) => {
  const { styleCache, target } = context;
  if (!sheets || sheets.length < 1) {
    return;
  }

  if (!Array.isArray(sheets)) {
    sheets = [sheets];
  }

  // Grab the style cache for the target document.
  const sheetsToRender = [];
  const cacheKey = target || defaultDocument;
  let targetStylesheets = styleCache.get(cacheKey);

  if (!targetStylesheets) {
    targetStylesheets = new Map();
    styleCache.set(cacheKey, targetStylesheets);
  }

  for (const sheet of sheets) {
    if (!targetStylesheets.has(sheet)) {
      sheetsToRender.push(sheet);
      targetStylesheets.set(sheet, true);
    }
  }

  if (sheetsToRender.length) {
    context.renderStyles(sheetsToRender, context);
  }
};

/**
 * Default renderStyles implementation, which will render the give sheets to the contextual
 * target.
 */
const renderStyles = (sheets: string[], context: StylesheetContextType): void => {
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
  styleCache: new WeakMap<Document | typeof defaultDocument, Map<string, boolean>>(),
});
