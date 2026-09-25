'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AvatarProps } from './Avatar.types';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';
import { useAvatarStyles } from './useAvatarStyles.styles';

/**
 * An avatar displays an image, initials, or an icon for a person or entity.
 */
export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef<HTMLElement, AvatarProps>((props, ref) => {
  const state = useAvatar(props, ref);

  useAvatarStyles(state);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
