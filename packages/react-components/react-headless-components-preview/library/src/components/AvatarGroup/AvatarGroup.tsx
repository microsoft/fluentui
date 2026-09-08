'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { AvatarGroupProps } from './AvatarGroup.types';
import { useAvatarGroup } from './useAvatarGroup';
import { useAvatarGroupContextValues } from './useAvatarGroupContextValues';
import { renderAvatarGroup } from './renderAvatarGroup';

/**
 * The AvatarGroup component displays a group of Avatars, each represented as an AvatarGroupItem.
 */
export const AvatarGroup: ForwardRefComponent<AvatarGroupProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroup(props, ref);
  const contextValues = useAvatarGroupContextValues(state);

  return renderAvatarGroup(state, contextValues);
});

AvatarGroup.displayName = 'AvatarGroup';
