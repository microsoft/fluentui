import { AvatarGroupContextValue, AvatarGroupContextValues } from '../AvatarGroup/AvatarGroup.types';
import { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

export const useAvatarGroupPopoverContextValues_unstable = (
  state: AvatarGroupPopoverState,
): AvatarGroupContextValues => {
  const avatarGroup: AvatarGroupContextValue = {
    isOverflow: true,
    size: 24,
  };

  return { avatarGroup };
};
