import * as React from 'react';
import { useMergeStylesRootStylesheets_unstable } from './MergeStylesRootContext';

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesShadowRootContextValue = {
  stylesheets: Map<string, CSSStyleSheet>;
  shadowRoot?: ShadowRoot | null;
};

const MergeStylesShadowRootContext = React.createContext<MergeStylesShadowRootContextValue>({
  stylesheets: new Map(),
});

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesShadowRootProviderProps = {
  shadowRoot?: ShadowRoot | null;
};

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MergeStylesShadowRootProvider_unstable: React.FC<MergeStylesShadowRootProviderProps> = ({
  shadowRoot,
  ...props
}) => {
  const ctx = useMergeStylesShadowRootContext_unstable();

  const value = React.useMemo(() => {
    return {
      stylesheets: ctx.stylesheets,
      shadowRoot,
    };
  }, [ctx, shadowRoot]);

  return <MergeStylesShadowRootContext.Provider value={value} {...props} />;
};

export type MergeStylesContextConsumerProps = {
  stylesheetKey?: string;
};

export const MergeStylesShadowRootConsumer: React.FC<MergeStylesContextConsumerProps> = ({
  stylesheetKey,
  children,
}) => {
  // useAdoptedStylesheet_unstable('__global__');
  useAdoptedStylesheet_unstable(stylesheetKey ?? '__global__');

  return <>{children}</>;
};

// const GlobalStyles: React.FC = props => {
//   useAdoptedStylesheet_unstable('__global__');
//   return null;
// };

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export const useAdoptedStylesheet_unstable = (stylesheetKey: string): void => {
  const shadowCtx = useMergeStylesShadowRootContext_unstable();
  const rootMergeStyles = useMergeStylesRootStylesheets_unstable();

  if (shadowCtx.shadowRoot && !shadowCtx.stylesheets.has(stylesheetKey)) {
    const stylesheet = rootMergeStyles.get(stylesheetKey);
    const adoptableStyleSheet = stylesheet?.getAdoptableStyleSheet();
    if (adoptableStyleSheet) {
      shadowCtx.stylesheets.set(stylesheetKey, adoptableStyleSheet);
      shadowCtx.shadowRoot.adoptedStyleSheets = [...shadowCtx.shadowRoot.adoptedStyleSheets, adoptableStyleSheet];
    }
  }
};

export const useMergeStylesShadowRootContext_unstable = () => {
  return React.useContext(MergeStylesShadowRootContext);
};
