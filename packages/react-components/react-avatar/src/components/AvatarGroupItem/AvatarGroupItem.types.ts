import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Avatar, AvatarSizes } from '../../Avatar';
import { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';

export type AvatarGroupItemSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Avatar that represents a person or entity.
   */
  avatar: NonNullable<Slot<typeof Avatar>>;

  /**
   * Label used for the name of the AvatarGroupItem when rendered as an overflow item.
   * The content of the label, by default, is the `name` prop from the `avatar` slot.
   */
  overflowLabel: NonNullable<Slot<'span'>>;
};

/**
 * AvatarGroupItem Props
 */
export type AvatarGroupItemProps = Omit<ComponentProps<Partial<AvatarGroupItemSlots>, 'avatar'>, 'size' | 'shape'>;

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

  nonOverflowAvatarsCount: number;
  layout: AvatarGroupProps['layout'];
  size: AvatarSizes;
};
