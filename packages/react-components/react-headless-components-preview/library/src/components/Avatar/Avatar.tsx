'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { AvatarProps } from './Avatar.types';
import { useAvatar } from './useAvatar';
import { renderAvatar } from './renderAvatar';

/**
 * An avatar component that displays an image or icon.
 */
export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef((props, ref) => {
  const state = useAvatar(props, ref);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
