'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { AvatarGroupProps } from './AvatarGroup.types';
import { useAvatarGroup } from './useAvatarGroup';
import { useAvatarGroupContextValues } from './useAvatarGroupContextValues';
import { renderAvatarGroup } from './renderAvatarGroup';
import { composeComponent } from '../../utils/composeComponent';

/**
 * The AvatarGroup component displays a group of Avatars, each represented as an AvatarGroupItem.
 */
export const AvatarGroup: ForwardRefComponent<AvatarGroupProps> = /*#__PURE__*/ composeComponent(
  'AvatarGroup',
  useAvatarGroup,
  renderAvatarGroup,
  useAvatarGroupContextValues,
);
