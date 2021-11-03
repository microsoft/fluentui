import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ActiveAppearance = (props: Partial<AvatarProps>) => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Avatar {...props} active="active" activeAppearance="ring" />
    <Avatar {...props} active="active" activeAppearance="shadow" />
    <Avatar {...props} active="active" activeAppearance="glow" />
    <Avatar {...props} active="active" activeAppearance="ring-shadow" />
    <Avatar {...props} active="active" activeAppearance="ring-glow" />
  </div>
);

ActiveAppearance.parameters = {
  docs: {
    description: {
      story: 'You can customize the appearance of the active state.',
    },
  },
};
