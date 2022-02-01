import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ActiveAppearance = (props: Partial<AvatarProps>) => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Avatar active="active" activeAppearance="ring" />
    <Avatar active="active" activeAppearance="shadow" />
    <Avatar active="active" activeAppearance="ring-shadow" />
  </div>
);

ActiveAppearance.parameters = {
  docs: {
    description: {
      story:
        'An avatar can have different appearances when active.' +
        ' Avatar supports `ring`, `shadow`, `glow`, `ring-shadow`, and `ring-glow`.' +
        ' The default is `ring`.',
    },
  },
};
