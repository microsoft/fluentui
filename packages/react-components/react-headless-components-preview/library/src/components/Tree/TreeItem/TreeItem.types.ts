import type {
  TreeItemState as TreeItemBaseState,
  TreeItemProps as TreeItemBaseProps,
  TreeItemContextValues as TreeItemBaseContextValues,
  TreeItemType,
} from '@fluentui/react-tree';

export type {
  TreeItemSlots,
  TreeItemType,
  TreeItemValue,
  TreeItemOpenChangeData,
  TreeItemOpenChangeEvent,
} from '@fluentui/react-tree';

export type TreeItemProps = TreeItemBaseProps & {
  /**
   * Disables activation, selection and expansion of this item and its descendants.
   * Disabled items remain focusable through tree navigation. An inherited disabled state cannot be overridden.
   * Custom interactive children, such as action buttons, must be disabled separately.
   * `aria-disabled={true}` or `"true"` also disables the item.
   * @default false
   */
  disabled?: boolean;
};

export type TreeItemContextValues = {
  treeItem: TreeItemBaseContextValues['treeItem'] & { disabled: boolean };
};

export type TreeItemState = TreeItemBaseState & {
  /** Resolved disabled state, including inheritance from the parent tree or item. */
  disabled: boolean;
  root: {
    /** Present when this item is disabled. */
    'data-disabled'?: string;
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
