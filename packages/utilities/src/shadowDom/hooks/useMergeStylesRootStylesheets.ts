import * as React from 'react';
import { MergeStylesRootContext } from '../contexts/MergeStylesRootContext';

/**
 * Get the map of stylesheets available in the context.
 */
export const useMergeStylesRootStylesheets = () => {
  return React.useContext(MergeStylesRootContext).stylesheets;
};
