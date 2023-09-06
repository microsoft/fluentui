import * as React from 'react';
import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { TreeItemType, TreeItemValue } from '../TreeItem';
import { TreeSelectionValue } from '../Tree';
import { headlessTreeRootId } from '../utils/tokens';

export type TreeItemContextValue = {
  value: TreeItemValue;
  open: boolean;
  itemType: TreeItemType;
  checked: TreeSelectionValue;
  isActionsVisible: boolean;
  isAsideVisible: boolean;
  selectionRef: React.Ref<HTMLInputElement>;
  actionsRef: React.Ref<HTMLDivElement>;
  expandIconRef: React.Ref<HTMLDivElement>;
  layoutRef: React.Ref<HTMLDivElement>;
  subtreeRef: React.Ref<HTMLDivElement>;
};

const defaultContextValue: TreeItemContextValue = {
  value: headlessTreeRootId,
  open: false,
  itemType: 'leaf',
  checked: false,
  isActionsVisible: false,
  isAsideVisible: false,
  selectionRef: React.createRef(),
  actionsRef: React.createRef(),
  expandIconRef: React.createRef(),
  layoutRef: React.createRef(),
  subtreeRef: React.createRef(),
};

export const TreeItemContext: Context<TreeItemContextValue | undefined> = createContext<
  TreeItemContextValue | undefined
>(undefined);

export const { Provider: TreeItemProvider } = TreeItemContext;
export const useTreeItemContext_unstable = <T>(selector: ContextSelector<TreeItemContextValue, T>): T =>
  useContextSelector(TreeItemContext, (ctx = defaultContextValue) => selector(ctx));
