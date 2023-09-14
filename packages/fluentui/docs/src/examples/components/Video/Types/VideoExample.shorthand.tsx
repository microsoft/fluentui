import * as React from 'react';
import { Video, Text, Flex } from '@fluentui/react-northstar';

const VideoExample = () => (
  <Flex column>
    <Video
      src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4"
      variables={{ width: '600px' }}
    />
    <Text>(c) copyright 2020, Microsoft</Text>
  </Flex>
);

export default VideoExample;
