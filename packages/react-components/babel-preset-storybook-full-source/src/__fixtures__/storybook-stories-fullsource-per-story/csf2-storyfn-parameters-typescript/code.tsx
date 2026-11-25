import type { Meta, StoryFn } from '@storybook/react';

const meta = { title: 'Example' } satisfies Meta;
export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => <div>Example</div>;

Default.parameters = {
  docs: { description: { story: 'Description' } },
};
