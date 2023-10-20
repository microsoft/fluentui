import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home, Enter } from '@fluentui/keyboard-keys';
import { TreeCheckedChangeData, TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';

export const treeItemLevelToken = '--fluent-TreeItem--level' as const;

export const treeAvatarSize = {
  medium: 32,
  small: 24,
} as const;

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
