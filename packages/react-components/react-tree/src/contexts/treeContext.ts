import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeOpenChangeData } from '../Tree';
import * as React from 'react';

export type TreeContextValue = {
  openTrees: string[];
  level: number;
  treeRef: React.RefObject<HTMLElement>;
  subtreeRef: React.RefObject<HTMLElement>;
  isSubtree: boolean;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange(data: TreeOpenChangeData): void;
};

const defaultContextValue: TreeContextValue = {
  level: 0,
  isSubtree: false,
  treeRef: React.createRef(),
  subtreeRef: React.createRef(),
  openTrees: [],
  requestOpenChange() {
    /* noop */
  },
};

export const TreeContext: Context<TreeContextValue | undefined> = createContext<TreeContextValue | undefined>(
  undefined,
);

export const { Provider: TreeProvider } = TreeContext;
export const useTreeContext_unstable = <T>(selector: ContextSelector<TreeContextValue, T>): T =>
  useContextSelector(TreeContext, (ctx = defaultContextValue) => selector(ctx));
