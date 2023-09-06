import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeItemType, TreeItemValue } from '../TreeItem';
import { SelectionMode } from '@fluentui/react-utilities';
import { ImmutableSet } from '../utils/ImmutableSet';
import { ImmutableMap } from '../utils/ImmutableMap';
import { TreeCheckedChangeData, TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';
import * as React from 'react';

export type SubtreeContextValue = {
  contextType: 'subtree';
  level: number;
};

export type TreeContextValue = {
  contextType: 'root';
  level: number;
  treeType: 'nested' | 'flat';
  selectionMode: 'none' | SelectionMode;
  appearance: 'subtle' | 'subtle-alpha' | 'transparent';
  size: 'small' | 'medium';
  openItems: ImmutableSet<TreeItemValue>;
  checkedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>;
  /**
   * requests root Tree component to respond to some tree item event,
   */
  requestTreeResponse(request: TreeItemRequest): void;
};

export type TreeItemRequest = { itemType: TreeItemType } & (
  | (OmitWithoutExpanding<TreeOpenChangeData, 'open' | 'openItems'> & { requestType: 'open' })
  | (OmitWithoutExpanding<TreeNavigationData_unstable, 'preventInternals'> & { requestType: 'navigate' })
  | (OmitWithoutExpanding<TreeCheckedChangeData, 'selectionMode' | 'checkedItems'> & { requestType: 'selection' })
);

// helper type that avoids the expansion of unions while inferring it, should work exactly the same as Omit
export type OmitWithoutExpanding<P, K extends string | number | symbol> = P extends unknown ? Omit<P, K> : P;

export const defaultTreeContextValue: TreeContextValue = {
  level: 0,
  contextType: 'root',
  treeType: 'nested',
  selectionMode: 'none',
  openItems: ImmutableSet.empty,
  checkedItems: ImmutableMap.empty,
  requestTreeResponse: noop,
  appearance: 'subtle',
  size: 'medium',
};

function noop() {
  /* noop */
}

export const defaultSubTreeContextValue: SubtreeContextValue = {
  level: 0,
  contextType: 'subtree',
};

export const defaultRootTreeContextValue: SubtreeContextValue = {
  level: 1,
  contextType: 'subtree',
};

const SubtreeContext: React.Context<SubtreeContextValue> = React.createContext<SubtreeContextValue | undefined>(
  undefined,
) as React.Context<SubtreeContextValue>;

export const useSubtreeContext_unstable = () => React.useContext(SubtreeContext) ?? defaultSubTreeContextValue;

const TreeContext: Context<TreeContextValue> = createContext<TreeContextValue | undefined>(
  undefined,
) as Context<TreeContextValue>;

export const useTreeContext_unstable = <T,>(selector: ContextSelector<TreeContextValue, T>): T =>
  useContextSelector(TreeContext, (ctx = defaultTreeContextValue) => selector(ctx));

export const TreeProvider = React.memo((props: React.ProviderProps<TreeContextValue | SubtreeContextValue>) => {
  if (props.value.contextType === 'subtree') {
    return <SubtreeContext.Provider value={props.value}>{props.children}</SubtreeContext.Provider>;
  }
  return (
    <TreeContext.Provider value={props.value}>
      <SubtreeContext.Provider value={defaultRootTreeContextValue}>{props.children}</SubtreeContext.Provider>
    </TreeContext.Provider>
  );
});

TreeProvider.displayName = 'TreeProvider';
