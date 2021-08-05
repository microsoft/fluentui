import { Avatar, Card, Flex, Image, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleInverted = () => (
  <Card aria-roledescription="card with avatar, image and text" inverted>
    <Card.Header>
      <Flex gap="gap.small">
        <Avatar
          image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
          label="Copy bandwidth"
          name="Robert Tolbert"
          status="unknown"
        />
        <Flex column>
          <Text content="Inverted card" weight="bold" />
          <Text content="For lighter background" size="small" />
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

export default CardExampleInverted;
