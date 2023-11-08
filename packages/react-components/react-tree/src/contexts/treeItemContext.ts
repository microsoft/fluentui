import * as React from 'react';
import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { TreeItemType, TreeItemValue } from '../TreeItem';
import { headlessTreeRootId } from '../utils/createHeadlessTree';
import { TreeSelectionValue } from '../Tree';

export type TreeItemContextValue = {
  /**
   * @deprecated - this value is irrelevant for the tree item
   */
  isActionsVisible: boolean;
  /**
   * @deprecated - this value is irrelevant for the tree item
   */
  isAsideVisible: boolean;
  selectionRef: React.Ref<HTMLInputElement>;
  actionsRef: React.Ref<HTMLDivElement>;
  expandIconRef: React.Ref<HTMLDivElement>;
  layoutRef: React.Ref<HTMLDivElement>;
  // FIXME: this should be React.RefObject<HTMLDivElement>,
  //  but as it would be a breaking change, we need to keep it as is for now
  subtreeRef: React.Ref<HTMLDivElement>;
  // FIXME: this is only marked as optional to avoid breaking changes
  // it should always be provided internally
  treeItemRef?: React.RefObject<HTMLDivElement>;
  itemType: TreeItemType;
  value: TreeItemValue;
  open: boolean;
  checked: TreeSelectionValue;
};

const defaultContextValue: TreeItemContextValue = {
  value: headlessTreeRootId,
  selectionRef: React.createRef(),
  layoutRef: React.createRef(),
  treeItemRef: React.createRef(),
  subtreeRef: React.createRef(),
  actionsRef: React.createRef(),
  expandIconRef: React.createRef(),
  isActionsVisible: false,
  isAsideVisible: false,
  itemType: 'leaf',
  open: false,
  checked: false,
};

export const TreeItemContext: Context<TreeItemContextValue | undefined> = createContext<
  TreeItemContextValue | undefined
>(undefined);

export const { Provider: TreeItemProvider } = TreeItemContext;
export const useTreeItemContext_unstable = <T>(selector: ContextSelector<TreeItemContextValue, T>): T =>
  useContextSelector(TreeItemContext, (ctx = defaultContextValue) => selector(ctx));
