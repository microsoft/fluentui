import * as React from 'react';
import { Avatar } from '../index';

export const ActiveAppearance = () => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <Avatar active="active" activeAppearance="ring" name="Ring" />
    <Avatar active="active" activeAppearance="shadow" name="Shadow" />
    <Avatar active="active" activeAppearance="ring-shadow" name="Ring Shadow" />
  </div>
);

ActiveAppearance.parameters = {
  docs: {
    description: {
      story:
        'An avatar can have different appearances when `active="active"`. ' +
        'Avatar supports `ring`, `shadow`, and `ring-shadow`. The default is `ring`.',
    },
  },
};
