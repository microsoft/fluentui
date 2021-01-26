import { Flex, Image, Text, Avatar, Card } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleSize = () => (
  <Flex gap="gap.small">
    <Card size="small" aria-roledescription="card with avatar, image and text">
      <Card.Header>
        <Flex gap="gap.small">
          <Avatar
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            label="Copy bandwidth"
            name="Robert Tolbert"
            status="unknown"
          />
          <Flex column>
            <Text content="Small card" weight="bold" />
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

    <Card aria-roledescription="card with avatar, image and text">
      <Card.Header>
        <Flex gap="gap.small">
          <Avatar
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            label="Copy bandwidth"
            name="Robert Tolbert"
            status="unknown"
          />
          <Flex column>
            <Text content="Medium (default) card" weight="bold" />
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

    <Card size="large" aria-roledescription="card with avatar, image and text">
      <Card.Header>
        <Flex gap="gap.small">
          <Avatar
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            label="Copy bandwidth"
            name="Robert Tolbert"
            status="unknown"
          />
          <Flex column>
            <Text content="Large card" weight="bold" />
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
  </Flex>
);

export default CardExampleSize;
