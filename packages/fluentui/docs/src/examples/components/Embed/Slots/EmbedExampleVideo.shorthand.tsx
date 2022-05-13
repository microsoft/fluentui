import * as React from 'react';
import { Embed, Flex, Text } from '@fluentui/react-northstar';

const EmbedExampleVideo = () => (
  <Flex column>
    <Embed
      placeholder="https://fabricweb.azureedge.net/fabric-website/assets/images/2020_MSFT_Icon_Celebration_placeholder.jpg"
      title="The new Microsoft icons: diverse and connected"
      video="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4"
      variables={{ height: '400px', width: '711.11px' }}
    />
    <Text>(c) copyright 2020, Microsoft</Text>
  </Flex>
);

export default EmbedExampleVideo;
