'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { AvatarProps } from './Avatar.types';
import { useAvatar } from './useAvatar';
import { renderAvatar } from './renderAvatar';
import { composeComponent } from '../../utils/composeComponent';

/**
 * An avatar component that displays an image or icon.
 */
export const Avatar: ForwardRefComponent<AvatarProps> = /*#__PURE__*/ composeComponent(
  'Avatar',
  useAvatar,
  renderAvatar,
);
