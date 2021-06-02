import * as React from 'react';
import { AvatarProps } from './Avatar.types';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';
import { useAvatarStyles } from './useAvatarStyles';
import { PresenceBadge } from '@fluentui/react-badge';

export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, props.badge ? { badge: { as: PresenceBadge } } : undefined);

  useAvatarStyles(state);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
