import type { TreeItemState as TreeItemBaseState, TreeItemType } from '@fluentui/react-tree';

export type {
  TreeItemSlots,
  TreeItemProps,
  TreeItemType,
  TreeItemValue,
  TreeItemContextValues,
  TreeItemOpenChangeData,
  TreeItemOpenChangeEvent,
} from '@fluentui/react-tree';

export type TreeItemState = TreeItemBaseState & {
  root: {
    /**
     * Data attribute reflecting the item type, `leaf` or `branch`.
     */
    'data-item-type'?: TreeItemType;
    /**
     * Data attribute set when a branch item is open.
     */
    'data-open'?: string;
    /**
     * Data attribute set when the item is checked. Value is an empty string when checked and `mixed`
     * when partially checked, and the attribute is absent when unchecked.
     */
    'data-checked'?: string;
  };
};
