import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';
import { TreeItemType, TreeItemValue } from '../TreeItem';
import { ImmutableSet } from '../utils/ImmutableSet';

export type TreeContextValue = {
  level: number;
  appearance: 'subtle' | 'subtle-alpha' | 'transparent';
  size: 'small' | 'medium';
  openItems: ImmutableSet<TreeItemValue>;
  /**
   * requests root Tree component to respond to some tree item event,
   */
  requestTreeResponse(request: TreeItemRequest): void;
};

export type TreeItemRequest = { itemType: TreeItemType } & (
  | OmitWithoutExpanding<TreeOpenChangeData, 'open' | 'openItems'>
  | TreeNavigationData_unstable
);

// helper type that avoids the expansion of unions while inferring it, should work exactly the same as Omit
type OmitWithoutExpanding<P, K extends string | number | symbol> = P extends unknown ? Omit<P, K> : P;

const defaultContextValue: TreeContextValue = {
  level: 0,
  openItems: ImmutableSet.empty,
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
