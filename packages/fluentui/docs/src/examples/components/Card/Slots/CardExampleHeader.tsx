import { Avatar, Card, Flex, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleHeader = () => (
  <Card aria-roledescription="card avatar">
    <Card.Header fitted>
      <Flex gap="gap.small">
        <Avatar
          image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
          label="Copy bandwidth"
          name="Robert Tolbert"
          status="unknown"
        />
        <Flex column>
          <Text content="Title goes here" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Flex>
    </Card.Header>
  </Card>
);

export default CardExampleHeader;
