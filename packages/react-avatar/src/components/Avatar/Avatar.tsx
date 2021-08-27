import * as React from 'react';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';
import { useAvatarStyles } from './useAvatarStyles';
import type { AvatarProps } from './Avatar.types';

export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref);

  useAvatarStyles(state);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
