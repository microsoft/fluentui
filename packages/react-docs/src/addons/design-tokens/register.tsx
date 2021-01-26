import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { json } from '@fluentui/design-tokens';

// give a unique name for the panel
const ADDON_ID = 'fluentui-addon-design-tokens';
const PANEL_ID = `${ADDON_ID}/panel`;

// TODO: get tokens to render in panel
addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Design Tokens',
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </AddonPanel>
    ),
  });
});
