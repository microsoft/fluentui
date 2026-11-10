import * as React from 'react';
import { MergeStylesDefaultContext } from '../contexts/MergeStylesDefaultContext';
import type { UseWindowHook } from '../contexts/MergeStylesDefaultContext';
import type { AdoptedStylesheetExHook, AdoptedStylesheetHook } from './useAdoptedStylesheet';
import type { ShadowConfigHook } from './useShadowConfig';
import type { HasMergeStylesShadowRootContextHook, MergeStylesShadowRootContextHook } from './useMergeStylesShadowRoot';
import type { MergeStylesRootStylesheetsHook } from './useMergeStylesRootStylesheets';
import type { UseStyledHook } from './useStyled';

export const useMergeStylesHooks = (): {
  useAdoptedStylesheetEx: AdoptedStylesheetExHook;
  useAdoptedStylesheet: AdoptedStylesheetHook;
  useShadowConfig: ShadowConfigHook;
  useMergeStylesShadowRootContext: MergeStylesShadowRootContextHook;
  useHasMergeStylesShadowRootContext: HasMergeStylesShadowRootContextHook;
  useMergeStylesRootStylesheets: MergeStylesRootStylesheetsHook;
  useWindow: UseWindowHook;
  useStyled: UseStyledHook;
} => {
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
