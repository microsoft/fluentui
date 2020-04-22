// import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';
import { compose } from '../utils/compose';

export interface PulsingAvatarProps extends AvatarProps {
  /**
   * Defines when the component is in a pulsing state.
   */
  pulsing?: boolean;
}

// Adding a modifier to a component:
// 1. Adjust the props typings to include the new modifier.
// 2. Provide additional class mappings.
// 3. Define the stylesheet.
export const PulsingAvatar = compose<PulsingAvatarProps>(Avatar, {
  classes: {
    pulsing: 'ms-Avatar--pulsing',
    label: 'ms-Avatar-label',
  },
  stylesheet: `
    @keyframes pulse {
      from {
        transform: scale(1);
        box-shadow: none;
       }
      to {
        transform: scale(1.15);
        box-shadow: 0 0 4px 2px rgba(0,0,0,.05);
       }
    }

    .ms-Avatar--pulsing .ms-Avatar-label {
      animation: pulse 1s alternate infinite cubic-bezier(.53,.21,.29,.67);
    }
  `,
});
