import * as React from 'react';
import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { TreeItemType, TreeItemValue } from '../TreeItem';

export type TreeItemContextValue = {
  layoutRef: React.Ref<HTMLDivElement>;
  subtreeRef: React.Ref<HTMLDivElement>;
  itemType: TreeItemType;
  value: TreeItemValue;
  open: boolean;
};

const defaultContextValue: TreeItemContextValue = {
  value: '',
  layoutRef: React.createRef(),
  subtreeRef: React.createRef(),
  itemType: 'leaf',
  open: false,
};

export const TreeItemContext: Context<TreeItemContextValue | undefined> = createContext<
  TreeItemContextValue | undefined
>(undefined);

export const { Provider: TreeItemProvider } = TreeItemContext;
export const useTreeItemContext_unstable = <T>(selector: ContextSelector<TreeItemContextValue, T>): T =>
  useContextSelector(TreeItemContext, (ctx = defaultContextValue) => selector(ctx));
