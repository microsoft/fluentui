import * as React from 'react';
import { EventMap } from '@fluentui/merge-styles';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    __mergeStylesAdoptedStyleSheets__?: Map<string, CSSStyleSheet>;
  }
}

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesContextValue = {
  stylesheets: Map<string, CSSStyleSheet>;
  shadowRoot?: ShadowRoot | null;
};

const MergeStylesContext = React.createContext<MergeStylesContextValue>({
  stylesheets: new Map(),
});

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesProviderProps = {
  shadowRoot?: ShadowRoot | null;
};

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MergeStylesProvider_unstable: React.FC<MergeStylesProviderProps> = ({ shadowRoot, ...props }) => {
  const ctx = useMergeStylesContext_unstable();

  const value = React.useMemo(() => {
    return {
      stylesheets: ctx.stylesheets,
      shadowRoot,
    };
  }, [ctx, shadowRoot]);

  return <MergeStylesContext.Provider value={value} {...props} />;
};

export type MergeStylesContextConsumerProps = {
  stylesheetKey?: string;
};

export const MergeStylesContextConsumer: React.FC<MergeStylesContextConsumerProps> = ({ stylesheetKey, children }) => {
  useAdoptedStylesheet_unstable(stylesheetKey ?? '__global__');

  return <>{children}</>;
};

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export const useMergeStylesContext_unstable = () => {
  return React.useContext(MergeStylesContext);
};

// type AddSheetCallback = ({ key: string, sheet: CSSStyleSheet }) => void;

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export const useAdoptedStylesheet_unstable = (stylesheetKey: string): void => {
  const ctx = useMergeStylesContext_unstable();

  if (ctx.shadowRoot && !ctx.stylesheets.has(stylesheetKey)) {
    const stylesheet = window.__mergeStylesAdoptedStyleSheets__?.get(stylesheetKey);
    if (stylesheet) {
      ctx.stylesheets.set(stylesheetKey, stylesheet);
      // eslint-disable-next-line
      // @ts-ignore types not working for some reason
      ctx.shadowRoot.adoptedStyleSheets = [...ctx.shadowRoot.adoptedStyleSheets, stylesheet];
    } else {
      if (!window.__mergeStylesAdoptedStyleSheets__) {
        // eslint-disable-next-line
        // @ts-ignore
        window.__mergeStylesAdoptedStyleSheets__ = new EventMap();
      }
      // eslint-disable-next-line
      // @ts-ignore
      window.__mergeStylesAdoptedStyleSheets__.on('add-sheet', ({ key, sheet }) => {
        if (!ctx.stylesheets.has(key)) {
          ctx.stylesheets.set(key, sheet);
          // eslint-disable-next-line
          // @ts-ignore types not working for some reason
          const adoptee = sheet.getAdoptableStyleSheet();
          if (adoptee) {
            ctx.shadowRoot.adoptedStyleSheets = [...ctx.shadowRoot.adoptedStyleSheets, adoptee];
          }
        }
      });
    }
  }
};
