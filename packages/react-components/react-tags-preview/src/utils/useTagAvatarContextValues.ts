import * as React from 'react';
import { AvatarSize, AvatarShape } from '@fluentui/react-avatar';

export type UseTagAvatarContextValuesOptions = {
  avatarSize: AvatarSize;
  avatarShape: AvatarShape;
};

export type TagAvatarContextValues = {
  avatar: {
    size?: AvatarSize;
    shape?: AvatarShape;
  };
};

export function useTagAvatarContextValues_unstable(state: UseTagAvatarContextValuesOptions): TagAvatarContextValues {
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
