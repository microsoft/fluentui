import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home, Enter, Space } from '@fluentui/keyboard-keys';
import { TreeNavigationData_unstable, TreeOpenChangeData, TreeSelectionChangeData } from '../Tree';

export const treeItemLevelToken = '--fluent-TreeItem--level' as const;

export const treeAvatarSize = {
  medium: 32,
  small: 24,
} as const;

export const treeDataTypes: {
  readonly [K in TreeOpenChangeData['type'] | TreeNavigationData_unstable['type'] | TreeSelectionChangeData['type']]: K;
} = {
  ArrowLeft,
  ArrowRight,
  Enter,
  Click: 'Click',
  ExpandIconClick: 'ExpandIconClick',
  SelectionIconClick: 'SelectionIconClick',
  End,
  Home,
  Space,
  ArrowUp,
  ArrowDown,
  TypeAhead: 'TypeAhead',
};
