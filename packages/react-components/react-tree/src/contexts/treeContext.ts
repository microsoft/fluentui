import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';
import { TreeItemId } from '../TreeItem';
import { emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';

export type TreeContextValue = {
  level: number;
  appearance: 'subtle' | 'subtle-alpha' | 'transparent';
  size: 'small' | 'medium';
  openItems: ImmutableSet<TreeItemId>;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange(data: TreeOpenChangeData): void;
  requestNavigation(data: TreeNavigationData_unstable): void;
};

const defaultContextValue: TreeContextValue = {
  level: 0,
  openItems: emptyImmutableSet,
  requestOpenChange: noop,
  requestNavigation: noop,
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
