import * as React from 'react';
import {
  FocusRectsProvider,
  MergeStylesRootProvider,
  MergeStylesShadowRootProvider,
  useAdoptedStylesheet,
  useAdoptedStylesheetEx,
  useShadowConfig,
  useHasMergeStylesShadowRootContext,
  useMergeStylesRootStylesheets,
} from '@fluentui/react';
import { useWindow } from '@fluentui/react-window-provider';
import root from 'react-shadow';

export type ShadowProps = {
  window?: Window;
};

export const Shadow: React.FC<ShadowProps> = ({ window, children }) => {
  // This is a ref but we're using state to manage it so we can force
  // a re-render.
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setShadowRootEl(ref.current);
    }
  }, []);

  return (
    <MergeStylesRootProvider
      window={window}
      useAdoptedStylesheet={useAdoptedStylesheet}
      useAdoptedStylesheetEx={useAdoptedStylesheetEx}
      useShadowConfig={useShadowConfig}
      useHasMergeStylesShadowRootContext={useHasMergeStylesShadowRootContext}
      useMergeStylesRootStylesheets={useMergeStylesRootStylesheets}
      useWindow={useWindow}
    >
      <FocusRectsProvider providerRef={ref}>
        <root.div className="shadow-root" delegatesFocus ref={ref}>
          <MergeStylesShadowRootProvider shadowRoot={shadowRootEl?.shadowRoot}>
            {children}
          </MergeStylesShadowRootProvider>
        </root.div>
      </FocusRectsProvider>
    </MergeStylesRootProvider>
  );
};
