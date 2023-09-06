import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home, Enter } from '@fluentui/keyboard-keys';
import { TreeCheckedChangeData, TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';

export const treeItemLevelToken = '--fluent-TreeItem--level';

/**
 * @internal
 */
export const treeAvatarSize = {
  medium: 32,
  small: 24,
} as const;

/**
 * @internal
 */
export const treeDataTypes: {
  readonly [K in TreeOpenChangeData['type'] | TreeNavigationData_unstable['type'] | TreeCheckedChangeData['type']]: K;
} = {
  ArrowLeft,
  ArrowRight,
  Enter,
  Click: 'Click',
  ExpandIconClick: 'ExpandIconClick',
  End,
  Home,
  ArrowUp,
  ArrowDown,
  TypeAhead: 'TypeAhead',
  Change: 'Change',
};

/**
 * @internal
 * This is the value used to identify the root of the tree.
 */
export const headlessTreeRootId = '__fuiHeadlessTreeRoot';

/**
 * @internal
 */
export const dataTreeItemValueAttrName = 'data-fui-tree-item-value';
