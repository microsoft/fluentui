import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { TreeOpenChangeData } from '../Tree';
import { TreeItemElement } from '../TreeItem';

export type TreeContextValue = {
  level: number;
  openSubtrees: string[];
  focusFirstSubtreeItem(target: TreeItemElement): void;
  focusSubtreeOwnerItem(target: TreeItemElement): void;
  /**
   * Requests dialog main component to update it's internal open state
   */
  requestOpenChange(data: TreeOpenChangeData): void;
};

const defaultContextValue: TreeContextValue = {
  level: 0,
  openSubtrees: [],
  focusFirstSubtreeItem() {
    /* noop */
  },
  focusSubtreeOwnerItem() {
    /* noop */
  },
  requestOpenChange() {
    /* noop */
  },
};

export const TreeContext: Context<TreeContextValue | undefined> = createContext<TreeContextValue | undefined>(
  undefined,
);

export const { Provider: TreeProvider } = TreeContext;
export const useTreeContext_unstable = <T>(selector: ContextSelector<TreeContextValue, T>): T =>
  useContextSelector(TreeContext, (ctx = defaultContextValue) => selector(ctx));
