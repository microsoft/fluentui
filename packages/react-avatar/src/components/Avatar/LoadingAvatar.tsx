// import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';
import { compose } from '../utils/compose';

export interface LoadingAvatarProps extends AvatarProps {
  /**
   * Defines when the component is in a loading state.
   */
  loading?: boolean;
}

// Adding a modifier to a component:
// 1. Adjust the props typings to include the new modifier.
// 2. Provide additional class mappings.
// 3. Define the stylesheet.
export const LoadingAvatar = compose<LoadingAvatarProps>(Avatar, {
  classes: { _loading: 'ms-Loading' },
  stylesheet: `
    @keyframes pulse {
      from { transform: rotate(0); }
      to { transform: rotate(360deg); }
    }

    .ms-Loading {
      animation-name: pulse;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(.53,.21,.29,.67);
    }
  `,
});
