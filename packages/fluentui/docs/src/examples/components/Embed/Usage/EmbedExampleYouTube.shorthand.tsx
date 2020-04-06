import * as React from 'react';
import { Embed, Flex, Text } from '@fluentui/react-northstar';

const EmbedExampleYouTube = () => (
  <Flex column>
    <Embed
      iframe={{
        allowFullScreen: true,
        src: 'https://www.youtube.com/embed/YE7VzlLtp-4?autoplay=1',
        frameBorder: 0,
        allow: ['autoplay'],
        height: '400px',
        width: '711.11px',
      }}
      placeholder="https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-480p-5s/master/poster.jpg"
      title="Picachu YouTube video"
      variables={{ height: '400px', width: '711.11px' }}
    />
    <Text>(c) copyright 2008, Blender Foundation / www.bigbuckbunny.org</Text>
  </Flex>
);

export default EmbedExampleYouTube;
