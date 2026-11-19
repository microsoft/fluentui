import type {
  TreeBaseProps,
  TreeBaseState,
  TreeContextValue as BaseTreeContextValue,
  SubtreeContextValue as BaseSubtreeContextValue,
  TreeNavigationMode,
} from '@fluentui/react-tree';

export type {
  TreeBaseSlots as TreeSlots,
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeNavigationData_unstable as TreeNavigationData,
  TreeNavigationDataParam,
  TreeNavigationEvent_unstable as TreeNavigationEvent,
  TreeNavigationMode,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeSelectionValue,
} from '@fluentui/react-tree';

export type TreeProps = TreeBaseProps & {
  /**
   * Disables activation, selection and expansion of this tree and its descendants.
   * Disabled items remain focusable through tree navigation. Descendants cannot override an inherited disabled state.
   * Custom interactive children, such as action buttons, must be disabled separately.
   * `aria-disabled={true}` or `"true"` also disables the tree.
   * @default false
   */
  disabled?: boolean;
};

export type TreeContextValue = BaseTreeContextValue & { disabled: boolean };
export type SubtreeContextValue = BaseSubtreeContextValue & { disabled: boolean };
export type TreeContextValues = { tree: TreeContextValue | SubtreeContextValue };

export type TreeState = TreeBaseState & {
  /** Resolved disabled state, including inheritance from the parent tree or item. */
  disabled: boolean;
  root: {
    /** Present when this tree is disabled. */
    'data-disabled'?: string;
    /**
     * Data attribute reflecting the navigation mode of the root tree, `tree` or `treegrid`.
     * The attribute is absent on subtrees.
     */
    'data-navigation-mode'?: TreeNavigationMode;
    /**
     * Data attribute reflecting the selection mode of the root tree, `single` or `multiselect`.
     * The attribute is absent on subtrees and when selection is disabled.
     */
    'data-selection-mode'?: 'single' | 'multiselect';
  };
};
