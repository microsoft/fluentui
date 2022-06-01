import type { AvatarGroupProps } from '../AvatarGroup';

export type AvatarGroupContextValue = Pick<AvatarGroupProps, 'size' | 'layout'> & {
  isOverflow?: boolean;
};

export type AvatarGroupContextValues = {
  avatarGroup: AvatarGroupContextValue;
};
