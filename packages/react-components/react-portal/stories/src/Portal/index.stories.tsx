import * as React from 'react';
import { Meta } from '@storybook/react';
import { Portal } from '@fluentui/react-components';
import descriptionMd from './PortalDescription.md';
export { Default } from './PortalDefault.stories';

export default {
  title: 'Components/Portal/Portal',
  component: Portal,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column', alignItems: 'flex-start' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
