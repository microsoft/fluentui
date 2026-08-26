export { AvatarGroup, avatarGroupClassNames, useAvatarGroupStyles } from './components/AvatarGroup';
export type { AvatarGroupProps, AvatarGroupSlots, AvatarGroupState } from './components/AvatarGroup';

/** Headless building blocks, re-exported for consumers composing their own AvatarGroup. */
export {
  AvatarGroupProvider,
  partitionAvatarGroupItems,
  renderAvatarGroup,
  useAvatarGroup,
  useAvatarGroupContext,
} from '@fluentui/react-headless-components-preview/avatar-group';
export type {
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  PartitionAvatarGroupItems,
  PartitionAvatarGroupItemsOptions,
} from '@fluentui/react-headless-components-preview/avatar-group';
