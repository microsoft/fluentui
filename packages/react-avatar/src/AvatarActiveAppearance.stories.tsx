import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

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
      story:
        'An avatar can have different appearances when active.' +
        ' Avatar supports `ring`, `shadow`, `glow`, `ring-shadow`, and `ring-glow`.' +
        ' The default is `ring`.',
    },
  },
};
