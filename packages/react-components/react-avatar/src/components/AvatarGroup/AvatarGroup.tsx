import * as React from 'react';
import { useAvatarGroup_unstable } from './useAvatarGroup';
import { renderAvatarGroup_unstable } from './renderAvatarGroup';
import { useAvatarGroupStyles_unstable } from './useAvatarGroupStyles';
import type { AvatarGroupProps } from './AvatarGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The AvatarGroup component represents a group of multiple people or entities by taking care of the arrangement
 * of individual Avatars in a spread, stack, or pie layout.
 */
export const AvatarGroup: ForwardRefComponent<AvatarGroupProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroup_unstable(props, ref);

  useAvatarGroupStyles_unstable(state);
  return renderAvatarGroup_unstable(state);
});

AvatarGroup.displayName = 'AvatarGroup';
