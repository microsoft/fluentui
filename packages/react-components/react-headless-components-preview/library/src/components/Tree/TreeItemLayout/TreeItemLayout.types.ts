import type { TreeItemLayoutBaseState } from '@fluentui/react-tree';

export type {
  TreeItemLayoutBaseSlots as TreeItemLayoutSlots,
  TreeItemLayoutBaseProps as TreeItemLayoutProps,
  TreeItemLayoutActionSlotProps,
  TreeItemLayoutActionVisibilityChangeData,
} from '@fluentui/react-tree';

export type TreeItemLayoutState = TreeItemLayoutBaseState & {
  /** Resolved disabled state of the containing item. */
  disabled: boolean;
  root: {
    /** Present when the containing item is disabled. */
    'data-disabled'?: string;
    /** Selection mode of the tree; absent when selection is not enabled. */
    'data-selection-mode'?: 'single' | 'multiselect';
  };
};
