import * as React from 'react';
import { Video } from './Video';

export const Default = () => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" controls />
);

export const AutoPlay = () => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" autoPlay />
);

export const Muted = () => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" muted />
);

export const WithPoster = () => (
  <Video
    src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4"
    poster="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg"
    controls
  />
);
