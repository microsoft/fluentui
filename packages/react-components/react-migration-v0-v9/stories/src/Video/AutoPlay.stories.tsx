import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Video } from '@fluentui/react-migration-v0-v9';

export const AutoPlay = (): JSXElement => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" autoPlay />
);
AutoPlay.storyName = 'AutoPlay';
