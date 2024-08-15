import * as React from 'react';
import { renderAvatarGroupPopover_unstable } from './renderAvatarGroupPopover';
import { useAvatarGroupPopoverContextValues_unstable } from './useAvatarGroupPopoverContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useAvatarGroupPopover_unstable } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverStyles_unstable } from './useAvatarGroupPopoverStyles.styles';
import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';

/**
 * The AvatarGroupPopover component provides a button with a Popover containing the children provided.
 */
export const AvatarGroupPopover: React.FC<AvatarGroupPopoverProps> = props => {
  const state = useAvatarGroupPopover_unstable(props);
  const contextValues = useAvatarGroupPopoverContextValues_unstable(state);

  useAvatarGroupPopoverStyles_unstable(state);

  useCustomStyleHook_unstable('useAvatarGroupPopoverStyles_unstable')(state);

  return renderAvatarGroupPopover_unstable(state, contextValues);
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';
