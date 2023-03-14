import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home } from '@fluentui/keyboard-keys';
import { TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree';

export const treeItemLevelToken = '--fluent-TreeItem--level' as const;

export const treeAvatarSize = {
  medium: 32,
  small: 24,
} as const;

export const treeDataTypes: {
  readonly [K in Uncapitalize<TreeOpenChangeData['type'] | TreeNavigationData_unstable['type']>]: Capitalize<K>;
} = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  enter: 'Enter',
  click: 'Click',
  expandIconClick: 'ExpandIconClick',
  end: End,
  home: Home,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  typeAhead: 'TypeAhead',
};
