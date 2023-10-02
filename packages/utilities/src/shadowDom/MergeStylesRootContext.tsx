import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY, Stylesheet } from '@fluentui/merge-styles';
import { getWindow } from '../dom';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface DocumentOrShadowRoot {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/adoptedStyleSheets) */
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesRootContextValue = {
  stylesheets: Map<string, CSSStyleSheet>;
};

const MergeStylesRootContext = React.createContext<MergeStylesRootContextValue>({
  stylesheets: new Map(),
});

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesRootProviderProps = {
  stylesheets?: Map<string, CSSStyleSheet>;
  window?: Window;
};

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MergeStylesRootProvider_unstable: React.FC<MergeStylesRootProviderProps> = ({
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

    const sheet = Stylesheet.getInstance();

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
    const sheet = Stylesheet.getInstance({
      window: win,
      inShadow: false,
      stylesheetKey: GLOBAL_STYLESHEET_KEY,
      __isShadowConfig__: true,
    });
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
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export const useMergeStylesRootStylesheets_unstable = () => {
  return React.useContext(MergeStylesRootContext).stylesheets;
};
