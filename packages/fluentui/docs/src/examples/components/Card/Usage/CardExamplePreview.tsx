import { Button, Flex, Image, Text, Card, Checkbox } from '@fluentui/react';
import * as React from 'react';

const CardExamplePreview = () => (
  <Card compact>
    <Card.TopControls>
      <Checkbox aria-label="test checkbox" />
    </Card.TopControls>
    <Card.Preview>
      <Image fluid src="public/images/wireframe/square-image.png" />
    </Card.Preview>
    <Card.Header fitted>
      <Flex padding="padding.medium">
        <Text content="It's a wonderful life" weight="bold" />
      </Flex>
    </Card.Header>
    <Card.Footer>
      <Flex space="between">
        <Flex.Item>
          <Button content="View album" text primary />
        </Flex.Item>
        <Flex.Item>
          <Flex vAlign="center">
            <Text content="2.4k likes" />
            <Button icon="like" iconOnly text title="More" />
          </Flex>
        </Flex.Item>
      </Flex>
    </Card.Footer>
  </Card>
);
export default CardExamplePreview;
