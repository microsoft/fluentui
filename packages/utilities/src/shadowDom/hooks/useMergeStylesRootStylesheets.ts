import * as React from 'react';
import { MergeStylesDefaultContext } from '../contexts/MergeStylesDefaultContext';
import type { ExtendedCSSStyleSheet } from '@fluentui/merge-styles';

export type MergeStylesRootStylesheetsHook = () => Map<string, ExtendedCSSStyleSheet>;

/**
 * Get the map of stylesheets available in the context.
 */
export const useMergeStylesRootStylesheets: MergeStylesRootStylesheetsHook = () => {
  return React.useContext(MergeStylesDefaultContext).stylesheets;
};
