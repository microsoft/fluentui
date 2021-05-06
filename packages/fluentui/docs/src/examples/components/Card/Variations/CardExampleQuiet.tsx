import { Avatar, Card, Flex, Image, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleQuiet = () => (
  <Card aria-roledescription="card with avatar, image and text" ghost>
    <Card.Header>
      <Flex gap="gap.small">
        <Avatar
          image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
          label="Copy bandwidth"
          name="Robert Tolbert"
          status="unknown"
        />
        <Flex column>
          <Text content="Ghost card" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Flex>
    </Card.Header>
    <Card.Body>
      <Flex column gap="gap.small">
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" fluid />
        <Text content="Content text" />
      </Flex>
    </Card.Body>
  </Card>
);

export default CardExampleQuiet;
