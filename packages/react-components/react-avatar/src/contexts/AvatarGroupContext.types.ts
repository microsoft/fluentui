import type { AvatarGroupProps } from '../AvatarGroup';

export type AvatarGroupContextValue = Pick<AvatarGroupProps, 'size' | 'layout'> & {
  isOverflow?: boolean;
  nonOverflowAvatarsCount?: number;
};
