import * as React from 'react';
import { MergeStylesRootProvider_unstable, MergeStylesShadowRootProvider_unstable } from '@fluentui/react';
import root from 'react-shadow';

export type ShadowProps = {
  window?: Window;
};

export const Shadow: React.FC<ShadowProps> = ({ window, children }) => {
  // This is a ref but we're using state to manage it so we can force
  // a re-render.
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  return (
    <MergeStylesRootProvider_unstable window={window}>
      <root.div className="shadow-root" delegatesFocus ref={setShadowRootEl}>
        <MergeStylesShadowRootProvider_unstable shadowRoot={shadowRootEl?.shadowRoot}>
          {children}
        </MergeStylesShadowRootProvider_unstable>
      </root.div>
    </MergeStylesRootProvider_unstable>
  );
};
