import * as React from 'react';

export type TreeItemContextValue = {
  isActionsVisible: boolean;
};

const defaultContextValue: TreeItemContextValue = {
  isActionsVisible: false,
};

export const TreeItemContext: React.Context<TreeItemContextValue | undefined> = React.createContext<
  TreeItemContextValue | undefined
>(undefined);

export const { Provider: TreeItemProvider } = TreeItemContext;
export const useTreeItemContext_unstable = (): TreeItemContextValue =>
  React.useContext(TreeItemContext) ?? defaultContextValue;
