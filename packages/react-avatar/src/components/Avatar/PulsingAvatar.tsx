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
  classes: { _pulsing: 'ms-Avatar--pulsing' },
  stylesheet: `
    @keyframes pulse {
      from {
        transform: scale(1);
       }
      to { transform: scale(1.15); }
    }

    .ms-Avatar--pulsing {
      animation-name: pulse;
      animation-duration: 1s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(.53,.21,.29,.67);
    }
  `,
});
