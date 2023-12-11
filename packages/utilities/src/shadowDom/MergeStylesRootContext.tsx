import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY, Stylesheet, makeShadowConfig } from '@fluentui/merge-styles';
import { getWindow } from '../dom';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface DocumentOrShadowRoot {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/adoptedStyleSheets) */
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

export type MergeStylesRootContextValue = {
  /**
   * Map of stylesheets available in the context.
   */
  stylesheets: Map<string, CSSStyleSheet>;
};

const MergeStylesRootContext = React.createContext<MergeStylesRootContextValue>({
  stylesheets: new Map(),
});

export type MergeStylesRootProviderProps = {
  /**
   * Map of stylesheets available in the context.
   */
  stylesheets?: Map<string, CSSStyleSheet>;

  /**
   * Optional `window` object to use for reading adopted stylesheets.
   * Useful for multi-window scenarios.
   */
  window?: Window;
};

/**
 * Root context provider for mergeStyles shadow DOM.
 * Typically this is placed at the render root of your React application.
 */
export const MergeStylesRootProvider: React.FC<MergeStylesRootProviderProps> = ({
  stylesheets: userSheets,
  window: userWindow,
  ...props
}) => {
  const win = userWindow ?? getWindow();
  const [stylesheets, setStylesheets] = React.useState<Map<string, CSSStyleSheet>>(() => userSheets ?? new Map());

  const sheetHandler = React.useCallback(({ key, sheet }) => {
    setStylesheets(prev => {
      const next = new Map<string, CSSStyleSheet>(prev);
      next.set(key, sheet);
      return next;
    });
  }, []);

  // Udapte stylesheets based on user style sheet changes
  React.useEffect(() => {
    setStylesheets(userSheets ?? new Map());
  }, [userSheets]);

  // Wire up listener for adopted stylesheets
  React.useEffect(() => {
    if (!win) {
      return;
    }

    const sheet = Stylesheet.getInstance(makeShadowConfig(GLOBAL_STYLESHEET_KEY, false, win));

    sheet.onAddConstructableStyleSheet(sheetHandler);

    return () => {
      sheet.offAddConstructableStyleSheet(sheetHandler);
    };
  }, [win, sheetHandler]);

  // Read stylesheets from window on mount
  React.useEffect(() => {
    if (!win) {
      return;
    }

    let changed = false;
    const next = new Map<string, CSSStyleSheet>(stylesheets);
    const sheet = Stylesheet.getInstance(makeShadowConfig(GLOBAL_STYLESHEET_KEY, false, win));

    sheet.forEachAdoptedStyleSheet((adoptedSheet, key) => {
      next.set(key, adoptedSheet);
      changed = true;
    });

    if (changed) {
      setStylesheets(next);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = React.useMemo(() => {
    return {
      stylesheets,
    };
  }, [stylesheets]);

  return <MergeStylesRootContext.Provider value={value} {...props} />;
};

/**
 * Get the map of stylesheets available in the context.
 */
export const useMergeStylesRootStylesheets = () => {
  return React.useContext(MergeStylesRootContext).stylesheets;
};
