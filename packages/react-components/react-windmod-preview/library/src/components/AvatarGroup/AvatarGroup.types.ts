import type {
  AvatarGroupProps as AvatarGroupHeadlessProps,
  AvatarGroupState as AvatarGroupHeadlessState,
} from '@fluentui/react-headless-components-preview/avatar-group';

import type { AvatarSize } from '../Avatar';

export type { AvatarGroupSlots } from '@fluentui/react-headless-components-preview/avatar-group';

/**
 * Windmod AvatarGroup props: the headless avatar group plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles, and it reaches every child by context).
 */
export type AvatarGroupProps = AvatarGroupHeadlessProps & {
  /** @default 32 */
  size?: AvatarSize;
};

/** Windmod AvatarGroup state: headless state plus the resolved look prop. */
export type AvatarGroupState = AvatarGroupHeadlessState & Required<Pick<AvatarGroupProps, 'size'>>;
