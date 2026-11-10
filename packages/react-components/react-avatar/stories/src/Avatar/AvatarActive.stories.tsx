import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Active = (): JSXElement => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <Avatar active="active" name="Ashley McCarthy" />
    <Avatar active="inactive" name="Isaac Fielder" badge={{ status: 'away' }} />
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
