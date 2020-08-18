import * as React from 'react';
import { Embed, Flex, Text } from '@fluentui/react-northstar';

const EmbedExampleVideo = () => (
  <Flex column>
    <Embed
      placeholder="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-480p-5s/master/poster.jpg"
      title="Big Buck Bunny video"
      video="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-1080p-5s/master/video.mp4"
      variables={{ height: '400px', width: '711.11px' }}
    />
    <Text>(c) copyright 2008, Blender Foundation / www.bigbuckbunny.org</Text>
  </Flex>
);

export default EmbedExampleVideo;
