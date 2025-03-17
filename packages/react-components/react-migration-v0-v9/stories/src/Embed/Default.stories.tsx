import * as React from 'react';
import { Embed } from '@fluentui/react-migration-v0-v9';
import type { Meta } from '@storybook/react';

export default {
  title: 'Migration Shims/V0/Embed',
  component: Embed,
} as Meta;

export const Default = () => (
  <div style={{ width: '480px' }}>
    <Embed
      placeholder="https://fabricweb.azureedge.net/fabric-website/assets/images/2020_MSFT_Icon_Celebration_placeholder.jpg"
      video="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4"
    />
  </div>
);

Default.parameters = {
  docs: {
    description: {
      story: 'An embed can display a video with a placeholder image.',
    },
  },
};
