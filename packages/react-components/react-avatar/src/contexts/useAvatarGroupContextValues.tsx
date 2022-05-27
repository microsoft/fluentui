import { AvatarGroupContextValue, AvatarGroupContextValues, AvatarGroupState } from '../AvatarGroup';

export const useAvatarGroupContextValues = (state: AvatarGroupState): AvatarGroupContextValues => {
  const { size, layout } = state;

  const avatarGroup: AvatarGroupContextValue = {
    color: 'colorful',
    layout,
    size,
  };

  return { avatarGroup };
};
