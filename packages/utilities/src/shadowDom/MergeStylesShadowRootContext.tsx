import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY } from '@fluentui/merge-styles';
import { FocusRectsProvider } from '../FocusRectsProvider';
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
  const focusProviderRef = React.useRef<HTMLDivElement>(null);

  return (
    <MergeStylesShadowRootContext.Provider value={value} {...props}>
      <GlobalStyles />
      <FocusRectsProvider providerRef={focusProviderRef}>
        <div className="ms-MergeStylesShadowRootProvider" ref={focusProviderRef}>
          {props.children}
        </div>
      </FocusRectsProvider>
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
  useAdoptedStylesheet_unstable(GLOBAL_STYLESHEET_KEY);
  useAdoptedStylesheet_unstable(stylesheetKey);

  const inShadow = useHasMergeStylesShadowRootContext();

  return children(inShadow);
};

const GlobalStyles: React.FC = props => {
  useAdoptedStylesheet_unstable(GLOBAL_STYLESHEET_KEY);
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
    const adoptableStyleSheet = rootMergeStyles.get(stylesheetKey);
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
