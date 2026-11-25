'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import { useAvatarGroupItem } from './useAvatarGroupItem';
import { renderAvatarGroupItem } from './renderAvatarGroupItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * An AvatarGroupItem represents a single Avatar inside an AvatarGroup. When rendered
 * inside an AvatarGroupPopover it is displayed as an overflow item with its name label.
 */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = /*#__PURE__*/ composeComponent(
  'AvatarGroupItem',
  useAvatarGroupItem,
  renderAvatarGroupItem,
);
