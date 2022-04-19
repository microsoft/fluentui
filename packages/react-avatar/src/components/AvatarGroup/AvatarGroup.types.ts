import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverSurface } from '@fluentui/react-popover';
import { AvatarSizes } from '../Avatar/Avatar.types';
import { Button } from '@fluentui/react-button';

export type AvatarGroupSlots = {
  root: Slot<'div'>;

  /**
   * Popover trigger slot that can be used to change the overflow indicator.
   */
  popoverTrigger?: Slot<typeof Button>;

  /**
   * Popover surface that will be displayed when the popover is triggered.
   */
  popoverSurface?: Slot<typeof PopoverSurface>;
};

type AvatarGroupCommons = {
  /**
   * Layout the Avatars should be displayed as.
   * @default grid
   */
  layout: 'grid' | 'stacked' | 'pie';

  /**
   * Maximum number of Avatars to be displayed before overflowing.
   * @default 5
   */
  maxAvatars: number;

  /**
   * Size of the avatars.
   * @default 32
   */
  size: Omit<AvatarSizes, 128>;
};

/**
 * AvatarGroup Props
 */
export type AvatarGroupProps = ComponentProps<AvatarGroupSlots> & Partial<AvatarGroupCommons>;

/**
 * State used in rendering AvatarGroup
 */
export type AvatarGroupState = ComponentState<AvatarGroupSlots> & AvatarGroupCommons;
