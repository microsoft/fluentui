import * as React from 'react';
import { Video } from '@fluentui/react-migration-v0-v9';

import descriptionMd from './VideoDescription.md';

export const Default = () => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" controls />
);
Default.storyName = 'Default';

export const AutoPlay = () => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" autoPlay />
);
AutoPlay.storyName = 'AutoPlay';

export const Muted = () => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" muted />
);
Muted.storyName = 'Muted';

export const WithPoster = () => (
  <Video
    src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4"
    poster="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg"
    controls
  />
);
WithPoster.storyName = 'WithPoster';

export default {
  title: 'Migration Shims/V0/Video',
  component: Video,
  args: {
    layout: 'verr',
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
