'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AvatarGroupProps } from './AvatarGroup.types';
import { renderAvatarGroup } from './renderAvatarGroup';
import { useAvatarGroup } from './useAvatarGroup';
import { useAvatarGroupContextValues } from '@fluentui/react-headless-components-preview/avatar-group';
import { useAvatarGroupStyles } from './useAvatarGroupStyles.styles';

/** The AvatarGroup component displays a group of Avatars. */
export const AvatarGroup: ForwardRefComponent<AvatarGroupProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroup(props, ref);
  const contextValues = useAvatarGroupContextValues(state);

  useAvatarGroupStyles(state);
  return renderAvatarGroup(state, contextValues);
});

AvatarGroup.displayName = 'AvatarGroup';
