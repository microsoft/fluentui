import { Button, Flex, Image, Text, Avatar, Card } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleSimple = () => (
  <Card>
    <Card.Header>
      <Flex gap="gap.small">
        <Avatar image="public/images/avatar/small/matt.jpg" label="Copy bandwidth" name="Evie yundt" status="unknown" />
        <Flex column>
          <Text content="Title goes here" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Flex>
    </Card.Header>
    <Card.Body>
      <Flex column gap="gap.small">
        <Image src="public/images/wireframe/square-image.png" />
        <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." />
      </Flex>
    </Card.Body>
    <Card.Footer>
      <Flex space="between">
        <Button content="Action" />
        <Flex>
          <Button icon="star" iconOnly text title="Favourite" />
          <Button icon="download" iconOnly text title="Download" />
          <Button icon="more" iconOnly text title="More" />
        </Flex>
      </Flex>
    </Card.Footer>
  </Card>
);

export default CardExampleSimple;
