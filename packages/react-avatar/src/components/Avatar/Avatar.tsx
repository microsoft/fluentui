import * as React from 'react';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';
import { useAvatarStyles } from './useAvatarStyles';
import type { AvatarProps } from './Avatar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef((props, ref) => {
  const state = useAvatar(props, ref);

  useAvatarStyles(state);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
