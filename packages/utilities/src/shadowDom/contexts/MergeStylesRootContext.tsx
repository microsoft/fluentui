import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY, Stylesheet, makeShadowConfig, DEFAULT_SHADOW_CONFIG } from '@fluentui/merge-styles';
import { getWindow } from '../../dom';
import type { ExtendedCSSStyleSheet } from '@fluentui/merge-styles';
import type { AdoptedStylesheetExHook, AdoptedStylesheetHook } from '../hooks/useAdoptedStylesheet';
import type { ShadowConfigHook } from '../hooks/useShadowConfig';
import type { HasMergeStylesShadowRootContextHook } from '../hooks/useMergeStylesShadowRoot';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface DocumentOrShadowRoot {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/adoptedStyleSheets) */
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

type UseWindowHook = () => Window | undefined;

const noop = () => false;
const noopShadow = () => DEFAULT_SHADOW_CONFIG;
const noopWindow = () => undefined;

// const noop: AdoptedStylesheetHook = _ => true;
// const noopEx: AdoptedStylesheetExHook = (_, _a, _b, _c) => true;

export type MergeStylesRootContextValue = {
  /**
   * Map of stylesheets available in the context.
   */
  stylesheets: Map<string, ExtendedCSSStyleSheet>;
  useAdoptedStylesheetEx: AdoptedStylesheetExHook;
  useAdoptedStylesheet: AdoptedStylesheetHook;
  useShadowConfig: ShadowConfigHook;
  useHasMergeStylesShadowRootContext: HasMergeStylesShadowRootContextHook;
  useWindow: UseWindowHook;
};

export const MergeStylesRootContext = React.createContext<MergeStylesRootContextValue>({
  stylesheets: new Map(),
  useAdoptedStylesheetEx: noop,
  useAdoptedStylesheet: noop,
  useShadowConfig: noopShadow,
  useHasMergeStylesShadowRootContext: noop,
  useWindow: noopWindow,
});

export type MergeStylesRootProviderProps = {
  /**
   * Map of stylesheets available in the context.
   */
  stylesheets?: Map<string, ExtendedCSSStyleSheet>;

  /**
   * Optional `window` object to use for reading adopted stylesheets.
   * Useful for multi-window scenarios.
   */
  window?: Window;

  useAdoptedStylesheetEx?: AdoptedStylesheetExHook;
  useAdoptedStylesheet?: AdoptedStylesheetHook;
  useShadowConfig?: ShadowConfigHook;
  useHasMergeStylesShadowRootContext?: HasMergeStylesShadowRootContextHook;
  useWindow?: UseWindowHook;
};

/**
 * Root context provider for mergeStyles shadow DOM.
 * Typically this is placed at the render root of your React application.
 */
export const MergeStylesRootProvider: React.FC<MergeStylesRootProviderProps> = ({
  stylesheets: userSheets,
  window: userWindow,
  useAdoptedStylesheet,
  useAdoptedStylesheetEx,
  useShadowConfig,
  useHasMergeStylesShadowRootContext,
  useWindow,
  ...props
}) => {
  const win = userWindow ?? getWindow();
  const [stylesheets, setStylesheets] = React.useState<Map<string, ExtendedCSSStyleSheet>>(
    () => userSheets || new Map(),
  );

  const sheetHandler = React.useCallback(({ key, sheet }) => {
    setStylesheets(prev => {
      const next = new Map<string, ExtendedCSSStyleSheet>(prev);
      next.set(key, sheet);
      return next;
    });
  }, []);

  // Udapte stylesheets based on user style sheet changes
  React.useEffect(() => {
    setStylesheets(userSheets || new Map());
  }, [userSheets]);

  // Wire up listener for adopted stylesheets
  React.useEffect(() => {
    if (!win) {
      return;
    }

    const sheet = Stylesheet.getInstance(makeShadowConfig(GLOBAL_STYLESHEET_KEY, false, win));
    const off = sheet.onAddSheet(sheetHandler);

    return () => {
      off();
    };
  }, [win, sheetHandler]);

  // Read stylesheets from window on mount
  React.useEffect(() => {
    if (!win) {
      return;
    }

    let changed = false;
    const next = new Map<string, ExtendedCSSStyleSheet>(stylesheets);
    const sheet = Stylesheet.getInstance(makeShadowConfig(GLOBAL_STYLESHEET_KEY, false, win));

    const adoptedSheets = sheet.getAdoptedSheets();

    adoptedSheets.forEach((adoptedSheet, key) => {
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
      useAdoptedStylesheet: useAdoptedStylesheet || noop,
      useAdoptedStylesheetEx: useAdoptedStylesheetEx || noop,
      useShadowConfig: useShadowConfig || noopShadow,
      useHasMergeStylesShadowRootContext: useHasMergeStylesShadowRootContext || noop,
      useWindow: useWindow || noopWindow,
    };
  }, [
    stylesheets,
    useAdoptedStylesheet,
    useAdoptedStylesheetEx,
    useShadowConfig,
    useHasMergeStylesShadowRootContext,
    useWindow,
  ]);

  return <MergeStylesRootContext.Provider value={value} {...props} />;
};
