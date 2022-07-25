import * as React from 'react';
import { useAvatarGroupOverflow_unstable } from './useAvatarGroupOverflow';
import { renderAvatarGroupOverflow_unstable } from './renderAvatarGroupOverflow';
import { useAvatarGroupOverflowStyles_unstable } from './useAvatarGroupOverflowStyles';
import type { AvatarGroupOverflowProps } from './AvatarGroupOverflow.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * AvatarGroupOverflow component - TODO: add more docs
 */
export const AvatarGroupOverflow: ForwardRefComponent<AvatarGroupOverflowProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroupOverflow_unstable(props, ref);

  useAvatarGroupOverflowStyles_unstable(state);
  return renderAvatarGroupOverflow_unstable(state);
});

AvatarGroupOverflow.displayName = 'AvatarGroupOverflow';
