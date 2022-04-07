import * as React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-components';

export { Default } from './Default.stories';
export { Primary } from './Primary.stories';
export { Action } from './Action.stories';
export { Command } from './Command.stories';
export { Compound } from './Compound.stories';
export { Toggle } from './Toggle.stories';

export default {
  title: 'Concepts/Upgrading/from v8/Button/Shims',
  component: Button,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
