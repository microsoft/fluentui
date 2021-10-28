import * as React from 'react';
import { Avatar, AvatarProps } from './index';

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
      story: 'An Avatar can communicate the state of the user, team, or entity.',
    },
  },
};
