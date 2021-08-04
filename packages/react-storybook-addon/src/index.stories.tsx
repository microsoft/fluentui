import * as React from 'react';
import { Meta, Story } from '@storybook/react';

export const Demo: Story = args => {
  return (
    <div>
      <p>Here be dragons</p>
    </div>
  );
};

export default {
  title: 'Internal/Storybook-Addon-Demo',
  component: Demo,
} as Meta;
