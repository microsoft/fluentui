import * as React from 'react';
import { useAvatar_unstable } from './useAvatar';
import type { AvatarProps } from './Avatar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef((props, ref) => {
  const [state, render] = useAvatar_unstable(props, ref);
  return render(state);
});

Avatar.displayName = 'Avatar';
