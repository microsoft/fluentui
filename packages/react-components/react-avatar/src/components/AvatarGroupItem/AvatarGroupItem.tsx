import * as React from 'react';
import { renderAvatarGroupItem_unstable } from './renderAvatarGroupItem';
import { useAvatarGroupItem_unstable } from './useAvatarGroupItem';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useAvatarGroupItemStyles_unstable } from './useAvatarGroupItemStyles.styles';
import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The AvatarGroupItem component represents a single person or entity.
 * AvatarGroupItem should only be used in an AvatarGroup component.
 */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroupItem_unstable(props, ref);

  useAvatarGroupItemStyles_unstable(state);

  useCustomStyleHook_unstable('useAvatarGroupItemStyles_unstable')(state);

  return renderAvatarGroupItem_unstable(state);
});

AvatarGroupItem.displayName = 'AvatarGroupItem';
