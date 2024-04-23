import * as React from 'react';
import { GLOBAL_STYLESHEET_KEY } from '@fluentui/merge-styles';
import { useMergeStylesHooks } from '../hooks/useMergeStylesHooks';

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

export const MergeStylesShadowRootContext = React.createContext<MergeStylesShadowRootContextValue | undefined>(
  undefined,
);

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

  return (
    <MergeStylesShadowRootContext.Provider value={value} {...props}>
      <GlobalStyles />
      {props.children}
    </MergeStylesShadowRootContext.Provider>
  );
};

const GlobalStyles: React.FC = props => {
  const { useAdoptedStylesheet } = useMergeStylesHooks();
  useAdoptedStylesheet(GLOBAL_STYLESHEET_KEY);
  return null;
};
