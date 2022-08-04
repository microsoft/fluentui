import * as React from 'react';
import { renderAvatarGroupOverflow_unstable } from './renderAvatarGroupOverflow';
import { useAvatarGroupOverflowContextValues } from './useAvatarGroupOverflowContextValues';
import { useAvatarGroupOverflow_unstable } from './useAvatarGroupOverflow';
import { useAvatarGroupOverflowStyles_unstable } from './useAvatarGroupOverflowStyles';
import type { AvatarGroupOverflowProps } from './AvatarGroupOverflow.types';

/**
 * The AvatarGroupOverflow component provides a button with a Popover containing the children provided.
 */
export const AvatarGroupOverflow: React.FC<AvatarGroupOverflowProps> = props => {
  const state = useAvatarGroupOverflow_unstable(props);
  const contextValues = useAvatarGroupOverflowContextValues(state);

  useAvatarGroupOverflowStyles_unstable(state);
  return renderAvatarGroupOverflow_unstable(state, contextValues);
};

AvatarGroupOverflow.displayName = 'AvatarGroupOverflow';
