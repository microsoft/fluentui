import * as React from 'react';
import { addons } from '@storybook/addons';

import { FluentTokens } from './FluentTokens';

addons.register('FUI_ADDON', api => {
  addons.addPanel('FUI_PANEL', {
    title: 'FUI Panel',
    render: ({ active, key }) => <FluentTokens key={key} active={active} />,
  });
});
