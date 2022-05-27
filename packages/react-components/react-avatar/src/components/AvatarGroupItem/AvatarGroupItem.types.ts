import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import type { Avatar } from '../../Avatar';

export type AvatarGroupItemSlots = {
  root: NonNullable<Slot<'div'> | Slot<'li'>>;

  /**
   * Avatar that represents a person or entity.
   */
  avatar: NonNullable<Slot<typeof Avatar>>;

  /**
   * Label used for the name of the AvatarGroupItem when rendered as an overflow item.
   */
  label?: Slot<typeof Label>;
};

/**
 * AvatarGroupItem Props
 */
export type AvatarGroupItemProps = ComponentProps<Partial<AvatarGroupItemSlots>, 'avatar'>;

/**
 * State used in rendering AvatarGroupItem
 */
export type AvatarGroupItemState = ComponentState<AvatarGroupItemSlots> & {
  /**
   * Whether the Avatar is an overflow item.
   *
   * @default false
   */
  isOverflowItem?: boolean;
};
