import * as React from 'react';
import { useMergeStylesRootStylesheets_unstable } from './MergeStylesRootContext';
/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export type MergeStylesShadowRootContextValue = {
  stylesheets: Map<string, CSSStyleSheet>;
  shadowRoot?: ShadowRoot | null;
};

// const MergeStylesShadowRootContext = React.createContext<MergeStylesShadowRootContextValue>({
//   stylesheets: new Map(),
// });

const MergeStylesShadowRootContext = React.createContext<MergeStylesShadowRootContextValue | undefined>(undefined);

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
  const value = React.useMemo(() => {
    return {
      stylesheets: new Map(),
      shadowRoot,
    };
  }, [shadowRoot]);

  return (
    <MergeStylesShadowRootContext.Provider value={value} {...props}>
      <GlobalStyles />
      {props.children}
    </MergeStylesShadowRootContext.Provider>
  );
};

export type MergeStylesContextConsumerProps = {
  stylesheetKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (inShadow: boolean) => React.ReactElement<any, any>;
};

export const MergeStylesShadowRootConsumer: React.FC<MergeStylesContextConsumerProps> = ({
  stylesheetKey,
  children,
}) => {
  useAdoptedStylesheet_unstable('__global__');
  // useAdoptedStylesheet_unstable('IconButton');
  // useAdoptedStylesheet_unstable('Fabric');
  useAdoptedStylesheet_unstable(stylesheetKey);

  const inShadow = useHasMergeStylesShadowRootContext();

  return children(inShadow);

  // return <>{children}</>;
};

const GlobalStyles: React.FC = props => {
  // useAdoptedStylesheet_unstable('@fluentui/style-utilities', true);
  useAdoptedStylesheet_unstable('__global__');
  return null;
};

/**
 * NOTE: This API is unstable and subject to breaking change or removal without notice.
 */
export const useAdoptedStylesheet_unstable = (stylesheetKey: string): boolean => {
  const shadowCtx = useMergeStylesShadowRootContext_unstable();
  const rootMergeStyles = useMergeStylesRootStylesheets_unstable();
  // console.log('useAdoptedStylesheets', stylesheetKey);

  if (!shadowCtx) {
    return false;
  }

  if (shadowCtx.shadowRoot && !shadowCtx.stylesheets.has(stylesheetKey)) {
    const stylesheet = rootMergeStyles.get(stylesheetKey);
    const adoptableStyleSheet = stylesheet?.getAdoptableStyleSheet();
    if (adoptableStyleSheet) {
      shadowCtx.stylesheets.set(stylesheetKey, adoptableStyleSheet);
      shadowCtx.shadowRoot.adoptedStyleSheets = [...shadowCtx.shadowRoot.adoptedStyleSheets, adoptableStyleSheet];
    }
  }

  return true;
};

export const useHasMergeStylesShadowRootContext = () => {
  return !!useMergeStylesShadowRootContext_unstable();
};

export const useMergeStylesShadowRootContext_unstable = () => {
  return React.useContext(MergeStylesShadowRootContext);
};
