import * as React from 'react';
import {
  MergeStylesShadowRootContext,
  MergeStylesShadowRootContextValue,
} from '../contexts/MergeStylesShadowRootContext';

export type HasMergeStylesShadowRootContextHook = () => boolean;
export type MergeStylesShadowRootContextHook = () => MergeStylesShadowRootContextValue | undefined;

/**
 * Test if a context is available.
 * @returns true if there is a context.
 */
export const useHasMergeStylesShadowRootContext: HasMergeStylesShadowRootContextHook = () => {
  return !!useMergeStylesShadowRootContext();
};

/**
 * Get a reference to the shadow root context.
 * @returns The context for the shadow root.
 */
export const useMergeStylesShadowRootContext: MergeStylesShadowRootContextHook = () => {
  return React.useContext(MergeStylesShadowRootContext);
};
