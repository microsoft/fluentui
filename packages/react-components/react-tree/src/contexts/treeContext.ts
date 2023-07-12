import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeNavigationData_unstable, TreeOpenChangeData, TreeSelectionChangeData } from '../Tree';
import { emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';
import { TreeItemType } from '../TreeItem';

export type TreeContextValue = {
  level: number;
  appearance: 'subtle' | 'subtle-alpha' | 'transparent';
  selection: 'none' | 'checkbox' | 'radio';
  size: 'small' | 'medium';
  openItems: ImmutableSet<unknown>;
  selectedItems?: Iterable<unknown>;

  /**
   * requests root Tree component to respond to some tree item event,
   */
  requestTreeResponse(request: TreeItemRequest): void;
};

export type TreeItemRequest = { itemType: TreeItemType } & (
  | OmitWithoutExpanding<TreeOpenChangeData, 'open' | 'target'>
  | OmitWithoutExpanding<TreeNavigationData_unstable, 'target'>
  | OmitWithoutExpanding<TreeSelectionChangeData, 'target'>
);

// helper type that avoids the expansion of unions while inferring it, should work exactly the same as Omit
type OmitWithoutExpanding<P, K extends string | number | symbol> = P extends unknown ? Omit<P, K> : P;

const defaultContextValue: TreeContextValue = {
  level: 0,
  openItems: emptyImmutableSet,
  selectedItems: emptyImmutableSet,
  requestTreeResponse: noop,
  appearance: 'subtle',
  size: 'medium',
  selection: 'none',
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
