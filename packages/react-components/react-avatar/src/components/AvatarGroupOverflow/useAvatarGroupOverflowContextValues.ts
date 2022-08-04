import { AvatarGroupContextValue, AvatarGroupContextValues } from '../AvatarGroup/AvatarGroup.types';
import { AvatarGroupOverflowState } from './AvatarGroupOverflow.types';

export const useAvatarGroupOverflowContextValues = (state: AvatarGroupOverflowState): AvatarGroupContextValues => {
  const avatarGroup: AvatarGroupContextValue = {
    isOverflow: true,
    size: 24,
  };

  return { avatarGroup };
};
