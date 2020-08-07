import * as React from 'react';
import { useAvatar } from './useAvatar';
import { AvatarProps } from './Avatar.types';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
// import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useFocusRects } from '@uifabric/utilities';
import * as classes from './Avatar.scss';
import { Status } from '../Status/Status';

const useAvatarClasses = makeClasses(classes);

export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const { state, render } = useAvatar(props, ref, {
    status: { as: Status },
  });

  // Apply styling.
  useAvatarClasses(state);
  useFocusRects(state.ref);

  // AvatarProps.tokens must be defined
  // useInlineTokens(state, '--avatar');

  return render(state);
});

Avatar.displayName = 'Avatar';
