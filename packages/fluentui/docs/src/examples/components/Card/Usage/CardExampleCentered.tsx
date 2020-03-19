import { Button, Flex, Image, Text, Avatar, Card } from '@fluentui/react';
import * as React from 'react';

const CenteredCard = () => (
  <div style={{ width: '300px', border: '1px solid grey' }}>
    <Card centered>
      <Card.Header>
        <Flex gap="gap.small" column hAlign="center">
          <Avatar image="public/images/avatar/small/matt.jpg" label="Copy bandwidth" name="Evie yundt" status="unknown" />
          <Text content="Title goes here" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" />
          <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." align="center" />
        </Flex>
      </Card.Body>
      <Card.Footer>
        <Flex space="between">
          <Flex.Item>
            <Button content="Action" />
          </Flex.Item>
          <Flex.Item>
            <Flex>
              <Button icon="star" iconOnly text title="Favourite" />
              <Button icon="download" iconOnly text title="Download" />
              <Button icon="more" iconOnly text title="More" />
            </Flex>
          </Flex.Item>
        </Flex>
      </Card.Footer>
    </Card>
  </div>
);
export default CenteredCard;
