import { DEFAULT_SHADOW_CONFIG, ExtendedCSSStyleSheet } from '@fluentui/merge-styles';
import * as React from 'react';

import type { AdoptedStylesheetExHook, AdoptedStylesheetHook } from '../hooks/useAdoptedStylesheet';
import type { ShadowConfigHook } from '../hooks/useShadowConfig';
import type {
  HasMergeStylesShadowRootContextHook,
  MergeStylesShadowRootContextHook,
} from '../hooks/useMergeStylesShadowRoot';
import type { MergeStylesRootStylesheetsHook } from '../hooks/useMergeStylesRootStylesheets';
import type { UseStyledHook } from '../hooks/useStyled';

export const noop = () => false;
export const noopShadow = () => DEFAULT_SHADOW_CONFIG;
export const noopRootStylesheets = () => new Map();
export const noopUndefined = () => undefined;

export const getNewContext = (): MergeStylesDefaultContextValue => {
  return {
    stylesheets: new Map(),
    useAdoptedStylesheetEx: noop,
    useAdoptedStylesheet: noop,
    useShadowConfig: noopShadow,
    useMergeStylesShadowRootContext: noopUndefined,
    useHasMergeStylesShadowRootContext: noop,
    useMergeStylesRootStylesheets: noopRootStylesheets,
    useWindow: noopUndefined,
    useStyled: noopUndefined,
  };
};

export type UseWindowHook = () => Window | undefined;

export type MergeStylesDefaultContextValue = {
  stylesheets: Map<string, ExtendedCSSStyleSheet>;
  useAdoptedStylesheetEx: AdoptedStylesheetExHook;
  useAdoptedStylesheet: AdoptedStylesheetHook;
  useShadowConfig: ShadowConfigHook;
  useMergeStylesShadowRootContext: MergeStylesShadowRootContextHook;
  useHasMergeStylesShadowRootContext: HasMergeStylesShadowRootContextHook;
  useMergeStylesRootStylesheets: MergeStylesRootStylesheetsHook;
  useWindow: UseWindowHook;
  useStyled: UseStyledHook;
};

export const MergeStylesDefaultContext = React.createContext<MergeStylesDefaultContextValue>(getNewContext());
