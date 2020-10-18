import * as React from 'react';
import { useAvatar } from './useAvatar';
import { AvatarProps } from './Avatar.types';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useFocusRects, nullRender } from '@uifabric/utilities';
import * as classes from './Avatar.scss';
import { Badge } from '../Badge/Badge';
import { renderAvatar } from './renderAvatar';

const useAvatarClasses = makeClasses(classes);

export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    badge: { as: props.badge ? Badge : nullRender },
  });

  // Apply styling.
  useAvatarClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--avatar');

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
