import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeItemId, TreeOpenChangeData } from '../Tree';
import { emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';

export type TreeContextValue = {
  level: number;
  appearance: 'subtle' | 'subtle-alpha' | 'transparent';
  size: 'small' | 'medium';
  openItems: ImmutableSet<TreeItemId>;
  focusFirstSubtreeItem(target: HTMLElement): void;
  focusSubtreeOwnerItem(target: HTMLElement): void;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange(data: TreeOpenChangeData): void;
};

const defaultContextValue: TreeContextValue = {
  level: 0,
  openItems: emptyImmutableSet,
  focusFirstSubtreeItem() {
    /* noop */
  },
  focusSubtreeOwnerItem() {
    /* noop */
  },
  requestOpenChange() {
    /* noop */
  },
  appearance: 'subtle',
  size: 'medium',
};

export const TreeContext: Context<TreeContextValue | undefined> = createContext<TreeContextValue | undefined>(
  undefined,
);

export const { Provider: TreeProvider } = TreeContext;
export const useTreeContext_unstable = <T>(selector: ContextSelector<TreeContextValue, T>): T =>
  useContextSelector(TreeContext, (ctx = defaultContextValue) => selector(ctx));
