import * as React from 'react';
import { MergeStylesRootContext } from '../contexts/MergeStylesRootContext';
import type { ExtendedCSSStyleSheet } from '@fluentui/merge-styles';

export type MergeStylesRootStylesheetsHook = () => Map<string, ExtendedCSSStyleSheet>;

/**
 * Get the map of stylesheets available in the context.
 */
export const useMergeStylesRootStylesheets: MergeStylesRootStylesheetsHook = () => {
  return React.useContext(MergeStylesRootContext).stylesheets;
};
