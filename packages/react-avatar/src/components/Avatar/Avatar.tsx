import { useFocusRects, nullRender } from '@fluentui/utilities';
import * as React from 'react';

import { Badge } from '../Badge/Badge';
import { AvatarProps } from './Avatar.types';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';
import { useAvatarStyles } from './useAvatarStyles';

export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    badge: { as: props.badge ? Badge : nullRender },
  });

  useAvatarStyles(state);
  useFocusRects(state.ref);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
