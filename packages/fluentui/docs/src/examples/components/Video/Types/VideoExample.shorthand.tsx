import * as React from 'react';
import { Video, Text, Flex } from '@fluentui/react-northstar';

const VideoExample = () => (
  <Flex column>
    <Video
      src="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-480p-30s/master/video.mp4"
      variables={{ width: '600px' }}
    />
    <Text>(c) copyright 2008, Blender Foundation / www.bigbuckbunny.org</Text>
  </Flex>
);

export default VideoExample;
