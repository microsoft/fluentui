import * as React from 'react';
import { Avatar } from '../index';

export const Active = () => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <Avatar active="active" name="Active" />
    <Avatar active="inactive" name="Inactive" />
  </div>
);

Active.parameters = {
  docs: {
    description: {
      story:
        'An avatar can communicate whether a user is currently active (for example, speaking or typing). ' +
        'Avatar supports `active`, `inactive`, and `unset`. The default is `unset`.',
    },
  },
};
