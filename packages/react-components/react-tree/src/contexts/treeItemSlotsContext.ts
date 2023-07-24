import * as React from 'react';
import type { TreeItemSlots } from '../TreeItem';
import type { Slot } from '@fluentui/react-utilities';
import type { Checkbox } from '@fluentui/react-checkbox';
import type { Radio } from '@fluentui/react-radio';

export type TreeItemSlotsContextValue = Pick<TreeItemSlots, 'actions' | 'aside' | 'expandIcon'> & {
  selector?: Slot<typeof Checkbox> | Slot<typeof Radio>;
};

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
