import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeItemType, TreeItemValue } from '../TreeItem';
import { SelectionMode } from '@fluentui/react-utilities';
import { ImmutableSet } from '../utils/ImmutableSet';
import { ImmutableMap } from '../utils/ImmutableMap';
import { TreeCheckedChangeData, TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';

export type TreeContextValue = {
  treeType: 'nested' | 'flat';
  level: number;
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
  | (TreeNavigationData_unstable & { requestType: 'navigate' })
  | (OmitWithoutExpanding<TreeCheckedChangeData, 'selectionMode' | 'checkedItems'> & { requestType: 'selection' })
);

// helper type that avoids the expansion of unions while inferring it, should work exactly the same as Omit
type OmitWithoutExpanding<P, K extends string | number | symbol> = P extends unknown ? Omit<P, K> : P;

const defaultContextValue: TreeContextValue = {
  treeType: 'nested',
  level: 0,
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

export const TreeContext: Context<TreeContextValue | undefined> = createContext<TreeContextValue | undefined>(
  undefined,
);

export const { Provider: TreeProvider } = TreeContext;
export const useTreeContext_unstable = <T>(selector: ContextSelector<TreeContextValue, T>): T =>
  useContextSelector(TreeContext, (ctx = defaultContextValue) => selector(ctx));
