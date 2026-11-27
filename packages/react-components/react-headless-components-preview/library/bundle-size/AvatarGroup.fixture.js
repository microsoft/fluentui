// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  AvatarGroupProvider,
  partitionAvatarGroupItems,
  renderAvatarGroup,
  renderAvatarGroupItem,
  renderAvatarGroupPopover,
  useAvatarGroup,
  useAvatarGroupContext,
  useAvatarGroupContextValues,
  useAvatarGroupItem,
  useAvatarGroupPopover,
  useAvatarGroupPopoverContextValues,
} from '@fluentui/react-headless-components-preview/avatar-group';

console.log(
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  AvatarGroupProvider,
  partitionAvatarGroupItems,
  renderAvatarGroup,
  renderAvatarGroupItem,
  renderAvatarGroupPopover,
  useAvatarGroup,
  useAvatarGroupContext,
  useAvatarGroupContextValues,
  useAvatarGroupItem,
  useAvatarGroupPopover,
  useAvatarGroupPopoverContextValues,
);

export default {
  name: '@fluentui/react-headless-components-preview/avatar-group',
};
