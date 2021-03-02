import * as React from 'react';
import { Flex, Image, Text, Header } from '@fluentui/react-northstar';

const FlexExampleMediaCard = () => (
  <Flex gap="gap.medium" padding="padding.medium" debug>
    <Flex.Item size="size.medium">
      <div style={{ position: 'relative' }}>
        <Image fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" />
      </div>
    </Flex.Item>

    <Flex.Item grow>
      <Flex column gap="gap.small" vAlign="stretch">
        <Flex space="between">
          <Header as="h3" content="LOREM IPSUM" />
          <Text as="pre" content="Oct 24th, 00:01" />
        </Flex>

        <Text content="Man braid iPhone locavore hashtag pop-up, roof party forage heirloom chillwave brooklyn yr 8-bit gochujang blog." />

        <Flex.Item push>
          <Text as="pre" content="COPYRIGHT: Fluent UI." />
        </Flex.Item>
      </Flex>
    </Flex.Item>
  </Flex>
);

export default FlexExampleMediaCard;
