export { AvatarGroup, avatarGroupClassNames, useAvatarGroupStyles } from './components/AvatarGroup';
export type { AvatarGroupProps, AvatarGroupSlots, AvatarGroupState } from './components/AvatarGroup';

export { AvatarGroupItem, avatarGroupItemClassNames, useAvatarGroupItemStyles } from './components/AvatarGroupItem';
export type { AvatarGroupItemProps, AvatarGroupItemSlots, AvatarGroupItemState } from './components/AvatarGroupItem';

export {
  AvatarGroupPopover,
  avatarGroupPopoverClassNames,
  useAvatarGroupPopoverStyles,
} from './components/AvatarGroupPopover';
export type {
  AvatarGroupPopoverPopoverProps,
  AvatarGroupPopoverProps,
  AvatarGroupPopoverSlots,
  AvatarGroupPopoverState,
} from './components/AvatarGroupPopover';

/** Headless building blocks, re-exported for consumers composing their own AvatarGroup.
 * `useAvatarGroupPopoverContextValues` is withheld: paired with `renderAvatarGroupPopover` it
 * produces Griffel-divergent overflow sizing — see AvatarGroupPopover.tsx. */
export {
  AvatarGroupProvider,
  partitionAvatarGroupItems,
  renderAvatarGroup,
  renderAvatarGroupItem,
  renderAvatarGroupPopover,
  useAvatarGroup,
  useAvatarGroupContext,
  useAvatarGroupItem,
  useAvatarGroupPopover,
} from '@fluentui/react-headless-components-preview/avatar-group';
export type {
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  PartitionAvatarGroupItems,
  PartitionAvatarGroupItemsOptions,
} from '@fluentui/react-headless-components-preview/avatar-group';
