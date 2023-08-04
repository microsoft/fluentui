import * as React from 'react';
import { AvatarSize, AvatarShape } from '@fluentui/react-avatar';

export type UseAvatarContextValuesOptions = {
  avatarSize: AvatarSize;
  avatarShape: AvatarShape;
};

export type AvatarContextValues = {
  avatar: {
    size?: AvatarSize;
    shape?: AvatarShape;
  };
};

export function useAvatarContextValues_unstable(state: UseAvatarContextValuesOptions): AvatarContextValues {
  const { avatarSize, avatarShape } = state;

  const avatar = React.useMemo(
    () => ({
      size: avatarSize,
      shape: avatarShape,
    }),
    [avatarShape, avatarSize],
  );

  return {
    avatar,
  };
}
