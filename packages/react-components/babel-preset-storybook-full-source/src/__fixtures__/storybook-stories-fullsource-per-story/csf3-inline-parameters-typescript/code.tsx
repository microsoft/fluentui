import type { Meta, StoryObj } from '@storybook/react';

const meta = { title: 'Example' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div>Example</div>,
  parameters: {
    docs: { description: { story: 'Description' } },
  },
};

export const Satisfies = {
  render: () => <div>Example</div>,
  parameters: {
    docs: { description: { story: 'Description' } },
  },
} satisfies Story;

export const As = {
  render: () => <div>Example</div>,
  parameters: {
    docs: { description: { story: 'Description' } },
  },
} as Story;
