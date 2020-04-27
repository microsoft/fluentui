import * as React from 'react';
export type HTMLDirection = 'rtl' | 'ltr' | 'auto';

export interface StylesheetContextType {
  dir: HTMLDirection;
  target: Document | undefined;
  register: (stylesheets: string[], context: StylesheetContextType) => void;
  styleCache: WeakMap<Document, Map<string, Map<string, boolean>>>;
  enqueuedSheets: string[];
  renderSheets: (stylesheets: string[], context: StylesheetContextType) => void;
  // hasRegistered: (stylehseet: string, context: StylesheetContextType) => boolean;
}

// Default registration function for stylesheets.
export const register = (stylesheets: string[], context: StylesheetContextType) => {
  const { styleCache, target, dir } = context;

  // Grab the style cache for the target document.
  let targetDirections = styleCache.get(target!);

  if (!targetDirections) {
    targetDirections = new Map();
    styleCache.set(target!, targetDirections);
  }

  // Grab the sheet set for the correct direction.
  let sheets = targetDirections.get(dir);

  if (!sheets) {
    sheets = new Map();
    targetDirections.set(dir, sheets);
  }

  for (const stylesheet of stylesheets) {
    if (!sheets.has(stylesheet)) {
      context.enqueuedSheets.unshift(stylesheet);
      sheets.set(stylesheet, true);
    }
  }

  // If there is no target, call renderSheets immediately.
  if (!target) {
    renderSheets(context.enqueuedSheets, context);
  }
};

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
  dir: 'ltr',
  target: typeof window === 'object' ? window.document : undefined,
  styleCache: new WeakMap<Document, Map<string, Map<string, boolean>>>(),
  enqueuedSheets: [],
});
