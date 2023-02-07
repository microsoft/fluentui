import type { AvatarSize } from '../Avatar/Avatar.types';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * AvatarGroup Props
 */
export type AvatarGroupProps = ComponentProps<AvatarGroupSlots> & {
  /**
   * Layout the AvatarGroupItems should be displayed as.
   * @default spread
   */
  layout?: 'spread' | 'stack' | 'pie';

  /**
   * Size of the AvatarGroupItems.
   * @default 32
   */
  size?: AvatarSize;
};

/**
 * State used in rendering AvatarGroup
 */
export type AvatarGroupState = ComponentState<AvatarGroupSlots> & Required<Pick<AvatarGroupProps, 'layout' | 'size'>>;

export type AvatarGroupContextValue = Pick<AvatarGroupProps, 'size' | 'layout'> & {
  isOverflow?: boolean;
};

export type AvatarGroupContextValues = {
  avatarGroup: AvatarGroupContextValue;
};
