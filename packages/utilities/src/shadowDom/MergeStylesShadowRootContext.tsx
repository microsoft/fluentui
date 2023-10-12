import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY, makeShadowConfig } from '@fluentui/merge-styles';
import { FocusRectsProvider } from '../FocusRectsProvider';
import { useMergeStylesRootStylesheets } from './MergeStylesRootContext';

export type MergeStylesShadowRootContextValue = {
  /**
   * Map of stylesheets available in the context.
   */
  stylesheets: Map<string, CSSStyleSheet>;

  /**
   * Shadow root for this context.
   */
  shadowRoot?: ShadowRoot | null;
};

const MergeStylesShadowRootContext = React.createContext<MergeStylesShadowRootContextValue | undefined>(undefined);

export type MergeStylesShadowRootProviderProps = {
  /**
   * Shadow root for this context.
   */
  shadowRoot?: ShadowRoot | null;
};

/**
 * Context for a shadow root.
 */
export const MergeStylesShadowRootProvider: React.FC<MergeStylesShadowRootProviderProps> = ({
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
  useAdoptedStylesheet(GLOBAL_STYLESHEET_KEY);
  useAdoptedStylesheet(stylesheetKey);

  const inShadow = useHasMergeStylesShadowRootContext();

  return children(inShadow);
};

const GlobalStyles: React.FC = props => {
  useAdoptedStylesheet(GLOBAL_STYLESHEET_KEY);
  return null;
};

/**
 * Use adopted stylesheets in the parent shadow root.
 */
export const useAdoptedStylesheet = (stylesheetKey: string): boolean => {
  const shadowCtx = useMergeStylesShadowRootContext();
  const rootMergeStyles = useMergeStylesRootStylesheets();

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

/**
 * Test if a context is available.
 * @returns true if there is a context.
 */
export const useHasMergeStylesShadowRootContext = () => {
  return !!useMergeStylesShadowRootContext();
};

/**
 * Get a reference to the shadow root context.
 * @returns The context for the shadow root.
 */
export const useMergeStylesShadowRootContext = () => {
  return React.useContext(MergeStylesShadowRootContext);
};

/**
 * Get a shadow config.
 * @param stylesheetKey - Globally unique key
 * @param win - Reference to the `window` global.
 * @returns ShadowConfig
 */
export const useShadowConfig = (stylesheetKey: string, win?: Window) => {
  const inShadow = useHasMergeStylesShadowRootContext();
  return React.useMemo(() => {
    return makeShadowConfig(stylesheetKey, inShadow, win);
  }, [stylesheetKey, inShadow, win]);
};
