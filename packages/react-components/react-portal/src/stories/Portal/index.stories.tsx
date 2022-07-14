import * as React from 'react';
import { Meta } from '@storybook/react';
import { Portal } from '@fluentui/react-portal';
import descriptionMd from './PortalDescription.md';
export { Default } from './PortalDefault.stories';
export { Nested } from './PortalNested.stories';

export default {
  title: 'Components/Portal',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
