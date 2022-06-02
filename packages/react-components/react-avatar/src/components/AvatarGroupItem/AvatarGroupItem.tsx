import * as React from 'react';
import { useAvatarGroupItem_unstable } from './useAvatarGroupItem';
import { renderAvatarGroupItem_unstable } from './renderAvatarGroupItem';
import { useAvatarGroupItemStyles_unstable } from './useAvatarGroupItemStyles';
import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * AvatarGroupItem component - TODO: add more docs
 */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = React.forwardRef((props, ref) => {
  const state = useAvatarGroupItem_unstable(props, ref);

  useAvatarGroupItemStyles_unstable(state);
  return renderAvatarGroupItem_unstable(state);
});

AvatarGroupItem.displayName = 'AvatarGroupItem';
