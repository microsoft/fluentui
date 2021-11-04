import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const Active = (props: Partial<AvatarProps>) => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Avatar {...props} active="active" />
    <Avatar {...props} active="inactive" />
    <Avatar {...props} active="unset" />
  </div>
);

Active.parameters = {
  docs: {
    description: {
      story:
        'An avatar can communicate the state of a user, team, or entity.' +
        ' Avatar supports `active`, `inactive`, and `unset`.' +
        ' The default is `unset`.',
    },
  },
};
