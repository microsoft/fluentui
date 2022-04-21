import * as React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-components';

export { DefaultButtonStory as DefaultButton } from './DefaultButtonShim.stories';
export { PrimaryButtonStory as PrimaryButton } from './PrimaryButtonShim.stories';
export { ActionButtonStory as ActionButton } from './ActionButtonShim.stories';
export { CommandButtonStory as CommandButton } from './CommandButtonShim.stories';
export { CompoundButtonStory as CompoundButton } from './CompoundButtonShim.stories';
export { ToggleButtonStory as ToggleButton } from './ToggleButtonShim.stories';

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
