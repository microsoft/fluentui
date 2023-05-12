import * as React from 'react';
import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeItemType } from '../TreeItem';

export type TreeItemContextValue = {
  isActionsVisible: boolean;
  isAsideVisible: boolean;
  actionsRef: React.Ref<HTMLDivElement>;
  expandIconRef: React.Ref<HTMLDivElement>;
  layoutRef: React.Ref<HTMLDivElement>;
  subtreeRef: React.Ref<HTMLDivElement>;
  value: unknown;
  itemType: TreeItemType;
  open: boolean;
};

const defaultContextValue: TreeItemContextValue = {
  value: undefined,
  isActionsVisible: false,
  isAsideVisible: true,
  actionsRef: React.createRef(),
  expandIconRef: React.createRef(),
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
