import * as React from 'react';
import { Avatar } from './index';

export const ActiveAppearance = () => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Avatar active="active" activeAppearance="ring" aria-label="ring activeAppearance" />
    <Avatar active="active" activeAppearance="shadow" aria-label="shadow activeAppearance" />
    <Avatar active="active" activeAppearance="ring-shadow" aria-label="ring-shadow activeAppearance" />
  </div>
);

ActiveAppearance.parameters = {
  docs: {
    description: {
      story:
        'An avatar can have different appearances when active.' +
        ' Avatar supports `ring`, `shadow`, and `ring-shadow`.' +
        ' The default is `ring`.',
    },
  },
};
