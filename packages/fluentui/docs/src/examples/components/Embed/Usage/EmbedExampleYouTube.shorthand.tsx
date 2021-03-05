import * as React from 'react';
import { Embed, Flex, Text } from '@fluentui/react-northstar';

const EmbedExampleYouTube = () => (
  <Flex column>
    <Embed
      iframe={{
        allowFullScreen: true,
        src: 'https://www.youtube.com/embed/wYmTkgqbrDM?autoplay=1',
        frameBorder: 0,
        allow: ['autoplay'],
        height: '400px',
        width: '711.11px',
      }}
      placeholder="https://i3.ytimg.com/vi/wYmTkgqbrDM/maxresdefault.jpg"
      title="The new Microsoft icons: diverse and connected"
      variables={{ height: '400px', width: '711.11px' }}
    />
    <Text>(c) copyright 2020, Microsoft</Text>
  </Flex>
);

export default EmbedExampleYouTube;
