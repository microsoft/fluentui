import * as React from 'react';
import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { TreeItemType, TreeItemValue } from '../TreeItem';
import { headlessTreeRootId } from '../utils/createHeadlessTree';
import type { TreeSelectionValue } from '../Tree';
import type { MenuOpenChangeData } from '@fluentui/react-menu';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';

export type TreeItemContextValue = {
  isActionsVisible: boolean;
  isAsideVisible: boolean;
  selectionRef: React.Ref<HTMLInputElement>;
  actionsRef: React.Ref<HTMLDivElement>;
  expandIconRef: React.Ref<HTMLDivElement>;
  layoutRef: React.Ref<HTMLDivElement>;
  subtreeRef: React.Ref<HTMLDivElement>;
  itemType: TreeItemType;
  value: TreeItemValue;
  open: boolean;
  checked?: TreeSelectionValue;
  isContextMenuOpen: boolean;
  requestContextMenuOpenChange: (data: MenuOpenChangeData) => void;
  positioningRef: React.Ref<PositioningImperativeRef>;
  menuPopoverRef: React.Ref<HTMLElement>;
};

const defaultContextValue: TreeItemContextValue = {
  value: headlessTreeRootId,
  selectionRef: React.createRef(),
  layoutRef: React.createRef(),
  subtreeRef: React.createRef(),
  actionsRef: React.createRef(),
  expandIconRef: React.createRef(),
  positioningRef: React.createRef(),
  menuPopoverRef: React.createRef(),
  isActionsVisible: false,
  isAsideVisible: false,
  itemType: 'leaf',
  open: false,
  checked: undefined,
  isContextMenuOpen: false,
  requestContextMenuOpenChange: () => {
    /* noop */
  },
};

export const TreeItemContext: Context<TreeItemContextValue | undefined> = createContext<
  TreeItemContextValue | undefined
>(undefined);

export const { Provider: TreeItemProvider } = TreeItemContext;
export const useTreeItemContext_unstable = <T>(selector: ContextSelector<TreeItemContextValue, T>): T =>
  useContextSelector(TreeItemContext, (ctx = defaultContextValue) => selector(ctx));
