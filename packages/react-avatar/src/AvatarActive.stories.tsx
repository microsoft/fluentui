import * as React from 'react';
import { Avatar } from './index';
import { Checkbox } from '@fluentui/react-checkbox';

export const Active = () => {
  const [active, setActive] = React.useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Avatar name="Active Example" active={active ? 'active' : 'inactive'} />
      <Checkbox checked={active} onChange={() => setActive(a => !a)} label="Active" />
    </div>
  );
};

Active.parameters = {
  docs: {
    description: {
      story:
        'An avatar can communicate whether a user is currently active (for example, speaking or typing).' +
        ' Avatar supports `active`, `inactive`, and `unset`.' +
        ' The default is `unset`.',
    },
  },
};
