import * as React from 'react';
import { TreeItemSlots } from '../TreeItem';

export type TreeItemSlotsContextValue = Pick<TreeItemSlots, 'actions' | 'aside' | 'expandIcon'>;

const defaultContextValue: TreeItemSlotsContextValue = {
  actions: undefined,
  aside: undefined,
  expandIcon: undefined,
};

export const TreeItemSlotsContext: React.Context<TreeItemSlotsContextValue | undefined> = React.createContext<
  TreeItemSlotsContextValue | undefined
>(undefined);

export const { Provider: TreeItemSlotsProvider } = TreeItemSlotsContext;
export const useTreeItemSlotsContext_unstable = (): TreeItemSlotsContextValue =>
  React.useContext(TreeItemSlotsContext) || defaultContextValue;
