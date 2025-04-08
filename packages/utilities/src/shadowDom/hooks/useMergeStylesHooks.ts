import * as React from 'react';
import { MergeStylesDefaultContext } from '../contexts/MergeStylesDefaultContext';

export const useMergeStylesHooks = () => {
  const ctx = React.useContext(MergeStylesDefaultContext);
  return {
    useAdoptedStylesheet: ctx.useAdoptedStylesheet,
    useAdoptedStylesheetEx: ctx.useAdoptedStylesheetEx,
    useShadowConfig: ctx.useShadowConfig,
    useMergeStylesShadowRootContext: ctx.useMergeStylesShadowRootContext,
    useHasMergeStylesShadowRootContext: ctx.useHasMergeStylesShadowRootContext,
    useMergeStylesRootStylesheets: ctx.useMergeStylesRootStylesheets,
    useWindow: ctx.useWindow,
    useStyled: ctx.useStyled,
  };
};
