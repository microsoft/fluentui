import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeItemType, TreeItemValue } from '../TreeItem';
import { SelectionMode } from '@fluentui/react-utilities';
import { ImmutableSet } from '../utils/ImmutableSet';
import { ImmutableMap } from '../utils/ImmutableMap';
import { TreeCheckedChangeData, TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';

export type TreeContextValue = {
  contextType?: 'root';
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
  | (TreeNavigationData_unstable & { requestType: 'navigate' })
  | (OmitWithoutExpanding<TreeCheckedChangeData, 'selectionMode' | 'checkedItems'> & { requestType: 'selection' })
);

/**
 * helper type that avoids the expansion of unions while inferring it,
 * should work exactly the same as Omit
 */
type OmitWithoutExpanding<P, K extends string | number | symbol> = P extends unknown ? Omit<P, K> : P;

/**
 * @internal
 */
const defaultTreeContextValue: TreeContextValue = {
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

/**
 * @internal
 */
export const TreeContext: Context<TreeContextValue> = createContext<TreeContextValue | undefined>(
  undefined,
) as Context<TreeContextValue>;

export const useTreeContext_unstable = <T>(selector: ContextSelector<TreeContextValue, T>): T =>
  useContextSelector(TreeContext, (ctx = defaultTreeContextValue) => selector(ctx));
