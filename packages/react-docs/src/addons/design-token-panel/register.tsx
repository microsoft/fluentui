import React from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
// import { useGlobals } from '@storybook/api';

import { json } from '@fluentui/design-tokens';

// TODO: get tokens to render in panel

addons.register('addon-design-tokens', () => {
  addons.add('addon-design-tokens/panel', {
    title: 'Fluent UI Design Tokens',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        {JSON.stringify(json, null, 2)}
      </AddonPanel>
    ),
  });
});
