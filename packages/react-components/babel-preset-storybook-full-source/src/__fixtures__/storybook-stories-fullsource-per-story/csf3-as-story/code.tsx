import type { Meta, StoryObj } from '@storybook/react';

const meta = { title: 'Example' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <div>Example</div>,
  parameters: {
    docs: { description: { story: 'Description' } },
  },
} as Story;
