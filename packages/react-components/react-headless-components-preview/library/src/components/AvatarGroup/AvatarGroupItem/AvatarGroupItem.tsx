'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import { useAvatarGroupItem } from './useAvatarGroupItem';
import { renderAvatarGroupItem } from './renderAvatarGroupItem';

/**
 * An AvatarGroupItem represents a single Avatar inside an AvatarGroup. When rendered
 * inside an AvatarGroupPopover it is displayed as an overflow item with its name label.
 */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroupItem(props, ref);

  return renderAvatarGroupItem(state);
});

AvatarGroupItem.displayName = 'AvatarGroupItem';
