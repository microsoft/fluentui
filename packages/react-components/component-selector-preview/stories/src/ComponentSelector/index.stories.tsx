import * as React from 'react';
import { Meta } from '@storybook/react';
export { Selector } from './Selector.stories';

export default {
  title: 'Concepts/Developer/Tools/Stories/Component Selector',
  decorators: [
    Story => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
