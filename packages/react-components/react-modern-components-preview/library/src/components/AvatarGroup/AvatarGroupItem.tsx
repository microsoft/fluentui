'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import { renderAvatarGroupItem } from './renderAvatarGroupItem';
import { useAvatarGroupItem } from './useAvatarGroupItem';
import { useAvatarGroupItemStyles } from './useAvatarGroupItemStyles.styles';

/** An AvatarGroupItem represents a single Avatar inside an AvatarGroup. */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroupItem(props, ref);

  useAvatarGroupItemStyles(state);
  return renderAvatarGroupItem(state);
});

AvatarGroupItem.displayName = 'AvatarGroupItem';
