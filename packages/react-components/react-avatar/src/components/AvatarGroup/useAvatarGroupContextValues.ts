import { AvatarGroupContextValue, AvatarGroupContextValues, AvatarGroupState } from '../AvatarGroup';

export const useAvatarGroupContextValues = (state: AvatarGroupState): AvatarGroupContextValues => {
  const { layout, size } = state;

  const avatarGroup: AvatarGroupContextValue = {
    layout,
    size,
  };

  return { avatarGroup };
};
