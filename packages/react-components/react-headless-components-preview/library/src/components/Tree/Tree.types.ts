import type { TreeBaseState, TreeNavigationMode } from '@fluentui/react-tree';

export type {
  TreeBaseSlots as TreeSlots,
  TreeBaseProps as TreeProps,
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeContextValues,
  TreeNavigationData_unstable as TreeNavigationData,
  TreeNavigationDataParam,
  TreeNavigationEvent_unstable as TreeNavigationEvent,
  TreeNavigationMode,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeSelectionValue,
} from '@fluentui/react-tree';

export type TreeState = TreeBaseState & {
  root: {
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
