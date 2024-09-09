import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeItemType, TreeItemValue } from '../TreeItem';
import type { SelectionMode, DistributiveOmit } from '@fluentui/react-utilities';
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
  | (DistributiveOmit<TreeOpenChangeData, 'openItems'> & { requestType: 'open' })
  | (TreeNavigationData_unstable & { requestType: 'navigate' })
  | (DistributiveOmit<TreeCheckedChangeData, 'selectionMode' | 'checkedItems'> & { requestType: 'selection' })
);

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
