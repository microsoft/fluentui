import * as React from 'react';
import { renderAvatar } from './renderAvatar';
import { useAvatar_unstable } from './useAvatar';
import { useAvatarStyles_unstable } from './useAvatarStyles';
import type { AvatarProps } from './Avatar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef((props, ref) => {
  const state = useAvatar_unstable(props, ref);

  useAvatarStyles_unstable(state);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
