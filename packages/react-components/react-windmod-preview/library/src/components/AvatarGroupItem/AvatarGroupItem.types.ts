import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  AvatarGroupItemProps as AvatarGroupItemHeadlessProps,
  AvatarGroupItemSlots as AvatarGroupItemHeadlessSlots,
  AvatarGroupItemState as AvatarGroupItemHeadlessState,
} from '@fluentui/react-headless-components-preview/avatar-group';

import type { Avatar, AvatarColor, AvatarSize } from '../Avatar';

/**
 * The headless slots type the avatar against the headless Avatar, which carries none of the look
 * props windmod's Avatar adds and does not narrow `color` — see PersonaSlots.
 */
export type AvatarGroupItemSlots = Omit<AvatarGroupItemHeadlessSlots, 'avatar'> & {
  avatar: NonNullable<Slot<typeof Avatar>>;
};

/**
 * Windmod AvatarGroupItem props: the headless item plus the two avatar look props the headless
 * surface deliberately omits.
 */
export type AvatarGroupItemProps = AvatarGroupItemHeadlessProps & {
  /** @default 'colorful' */
  color?: AvatarColor;
  /** Seeds the `colorful` hash in place of the avatar's `name`. */
  idForColor?: string | undefined;
};

/** Windmod AvatarGroupItem state: headless state plus the size read off the group context. */
export type AvatarGroupItemState = ComponentState<AvatarGroupItemSlots> &
  Pick<AvatarGroupItemHeadlessState, 'isOverflowItem' | 'layout'> & {
    size: AvatarSize;
  };
