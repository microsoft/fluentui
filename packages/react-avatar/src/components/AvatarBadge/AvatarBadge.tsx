import * as React from 'react';
import { useAvatarBadge } from './useAvatarBadge';
import { AvatarBadgeProps } from './AvatarBadge.types';
import { renderAvatarBadge } from './renderAvatarBadge';
import { useAvatarBadgeStyles } from './useAvatarBadgeStyles';

export const AvatarBadge = React.forwardRef((props: AvatarBadgeProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatarBadge(props, ref);
  useAvatarBadgeStyles(state);

  return renderAvatarBadge(state);
});

AvatarBadge.displayName = 'AvatarBadge';
