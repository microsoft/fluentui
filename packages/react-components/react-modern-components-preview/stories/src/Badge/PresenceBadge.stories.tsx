import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PresenceBadge } from '@fluentui/react-modern-components-preview/badge';

const meta = {
  title: 'Components/Badge/PresenceBadge',
  component: PresenceBadge,
  args: {
    status: 'available',
  },
} satisfies Meta<typeof PresenceBadge>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: args => <PresenceBadge {...args} />,
};
