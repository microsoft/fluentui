import * as React from 'react';
import { MergeStylesRootContext } from '../contexts/MergeStylesRootContext';

export const useMergeStylesHooks = () => {
  const ctx = React.useContext(MergeStylesRootContext);
  return {
    useAdoptedStylesheet: ctx.useAdoptedStylesheet,
    useAdoptedStylesheetEx: ctx.useAdoptedStylesheetEx,
    useShadowConfig: ctx.useShadowConfig,
    useHasMergeStylesShadowRootContext: ctx.useHasMergeStylesShadowRootContext,
    useMergeStylesRootStylesheets: ctx.useMergeStylesRootStylesheets,
    useWindow: ctx.useWindow,
  };
};
