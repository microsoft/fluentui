import * as React from 'react';
import { EventMap, Stylesheet } from '@fluentui/merge-styles';
import { getWindow } from '../dom';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    __mergeStylesAdoptedStyleSheets__?: EventMap<string, Stylesheet>;
  }

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
  stylesheets: Map<string, Stylesheet>;
};

const MergeStylesRootContext = React.createContext<MergeStylesRootContextValue>({
  stylesheets: new Map(),
});

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesRootProviderProps = {
  stylesheets?: Map<string, Stylesheet>;
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
  const [stylesheets, setStylesheets] = React.useState<Map<string, Stylesheet>>(() => userSheets ?? new Map());

  const sheetHandler = React.useCallback(({ key, sheet }) => {
    setStylesheets(prev => {
      const next = new Map<string, Stylesheet>(prev);
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

    if (!win.__mergeStylesAdoptedStyleSheets__) {
      win.__mergeStylesAdoptedStyleSheets__ = new EventMap<string, Stylesheet>();
    }

    win.__mergeStylesAdoptedStyleSheets__.on('add-sheet', sheetHandler);

    return () => {
      win?.__mergeStylesAdoptedStyleSheets__ && win.__mergeStylesAdoptedStyleSheets__.off('add-sheet', sheetHandler);
    };
  }, [win, sheetHandler]);

  // Read stylesheets from window on mount
  React.useEffect(() => {
    if (!win || !win.__mergeStylesAdoptedStyleSheets__) {
      return;
    }

    let changed = false;
    const next = new Map<string, Stylesheet>(stylesheets);
    win.__mergeStylesAdoptedStyleSheets__.forEach((sheet, key) => {
      next.set(key, sheet);
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
