import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY, ShadowDomStylesheet, makeShadowConfig } from '@fluentui/merge-styles';
import { getWindow } from '../../dom';
import { MergeStylesDefaultContext, getNewContext } from './MergeStylesDefaultContext';
import {
  useAdoptedStylesheet as useAdoptedStylesheetDefault,
  useAdoptedStylesheetEx as useAdoptedStylesheetExDefault,
} from '../hooks/useAdoptedStylesheet';

import { useShadowConfig as useShadowConfigDefault } from '../hooks/useShadowConfig';
import {
  useHasMergeStylesShadowRootContext as useHasMergeStylesShadowRootContextDefault,
  useMergeStylesShadowRootContext as useMergeStylesShadowRootContextDefault,
} from '../hooks/useMergeStylesShadowRoot';
import { useMergeStylesRootStylesheets as useMergeStylesRootStylesheetsDefault } from '../hooks/useMergeStylesRootStylesheets';
import { useStyled as useStyledDefault } from '../hooks/useStyled';
import { useWindow as useWindowDefault } from '@fluentui/react-window-provider';

import type { ExtendedCSSStyleSheet } from '@fluentui/merge-styles';
import type { AdoptedStylesheetExHook, AdoptedStylesheetHook } from '../hooks/useAdoptedStylesheet';
import type { ShadowConfigHook } from '../hooks/useShadowConfig';
import type {
  HasMergeStylesShadowRootContextHook,
  MergeStylesShadowRootContextHook,
} from '../hooks/useMergeStylesShadowRoot';
import type { MergeStylesRootStylesheetsHook } from '../hooks/useMergeStylesRootStylesheets';
import type { UseStyledHook } from '../hooks/useStyled';
import type { UseWindowHook } from './MergeStylesDefaultContext';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface DocumentOrShadowRoot {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/adoptedStyleSheets) */
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

export type MergeStylesRootContextValue = {
  stylesheets: Map<string, ExtendedCSSStyleSheet>;
  useAdoptedStylesheetEx: AdoptedStylesheetExHook;
  useAdoptedStylesheet: AdoptedStylesheetHook;
  useShadowConfig: ShadowConfigHook;
  useMergeStylesShadowRootContext: MergeStylesShadowRootContextHook;
  useHasMergeStylesShadowRootContext: HasMergeStylesShadowRootContextHook;
  useMergeStylesRootStylesheets: MergeStylesRootStylesheetsHook;
  useWindow: UseWindowHook;
  useStyled: UseStyledHook;
};

export const MergeStylesRootContext = React.createContext<MergeStylesRootContextValue>(getNewContext());

export type MergeStylesRootProviderProps = {
  children?: React.ReactNode;
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
  useMergeStylesShadowRootContext?: MergeStylesShadowRootContextHook;
  useHasMergeStylesShadowRootContext?: HasMergeStylesShadowRootContextHook;
  useMergeStylesRootStylesheets?: MergeStylesRootStylesheetsHook;
  useWindow?: UseWindowHook;
  useStyled?: UseStyledHook;
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
  useMergeStylesShadowRootContext,
  useHasMergeStylesShadowRootContext,
  useMergeStylesRootStylesheets,
  useWindow,
  useStyled,
  ...props
}) => {
  const win = userWindow ?? getWindow();
  const [stylesheets, setStylesheets] = React.useState<Map<string, ExtendedCSSStyleSheet>>(
    () => userSheets || new Map(),
  );

  const sheetHandler = React.useCallback(({ key, sheet }: { key: string; sheet: ExtendedCSSStyleSheet }) => {
    setStylesheets(prev => {
      const next = new Map<string, ExtendedCSSStyleSheet>(prev);
      next.set(key, sheet);
      return next;
    });
  }, []);

  // Update stylesheets based on user style sheet changes
  React.useEffect(() => {
    setStylesheets(userSheets || new Map());
  }, [userSheets]);

  // Wire up listener for adopted stylesheets
  React.useEffect(() => {
    if (!win) {
      return;
    }

    const sheet = ShadowDomStylesheet.getInstance(makeShadowConfig(GLOBAL_STYLESHEET_KEY, false, win));
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
    const sheet = ShadowDomStylesheet.getInstance(makeShadowConfig(GLOBAL_STYLESHEET_KEY, false, win));

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

  const defaultValues = React.useMemo(() => {
    return {
      stylesheets,
      useAdoptedStylesheet: useAdoptedStylesheet || useAdoptedStylesheetDefault,
      useAdoptedStylesheetEx: useAdoptedStylesheetEx || useAdoptedStylesheetExDefault,
      useShadowConfig: useShadowConfig || useShadowConfigDefault,
      useMergeStylesShadowRootContext: useMergeStylesShadowRootContext || useMergeStylesShadowRootContextDefault,
      useHasMergeStylesShadowRootContext:
        useHasMergeStylesShadowRootContext || useHasMergeStylesShadowRootContextDefault,
      useMergeStylesRootStylesheets: useMergeStylesRootStylesheets || useMergeStylesRootStylesheetsDefault,
      useWindow: useWindow || useWindowDefault,
      useStyled: useStyled || useStyledDefault,
    };
  }, [
    stylesheets,
    useAdoptedStylesheet,
    useAdoptedStylesheetEx,
    useShadowConfig,
    useMergeStylesShadowRootContext,
    useHasMergeStylesShadowRootContext,
    useMergeStylesRootStylesheets,
    useWindow,
    useStyled,
  ]);

  return (
    <MergeStylesDefaultContext.Provider value={defaultValues}>
      <MergeStylesRootContext.Provider value={defaultValues} {...props} />
    </MergeStylesDefaultContext.Provider>
  );
};
