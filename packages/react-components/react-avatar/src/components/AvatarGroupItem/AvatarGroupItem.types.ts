import { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';
import type { Avatar, AvatarSize } from '../../Avatar';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupItemSlots = {
  root: NonNullable<Slot<'div', 'li'>>;

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

  layout: AvatarGroupProps['layout'];
  size: AvatarSize;
};
